import React, { createContext, useContext, useEffect, useState } from 'react';
import themes from '../themes';

const ThemeContext = createContext();

const guessRoleFromStorage = () => {
  try {
    const u = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (u && (u.role || u.designation || u.staffType)) {
      // Prefer role, but fallback to designation/staffType mappings
      if (u.role) return u.role;
      if (u.staffType === 'teaching') return 'teacher';
      if (u.designation && /admin|principal|hod/i.test(u.designation)) return 'admin';
      if (u.designation && /teacher/i.test(u.designation)) return 'teacher';
      if (u.designation && /parent/i.test(u.designation)) return 'parent';
    }
  } catch (e) {
    // ignore
  }
  return 'student';
};

export function ThemeProvider({ children }) {
  const [role, setRole] = useState(guessRoleFromStorage());

  useEffect(() => {
    const apply = (r) => {
      const classList = ['theme-student','theme-parent','theme-teacher','theme-admin'];
      document.documentElement.classList.remove(...classList);
      const cname = `theme-${r}`;
      document.documentElement.classList.add(cname);

      const t = themes[r] || themes.student;
      Object.entries(t).forEach(([k, v]) => {
        document.documentElement.style.setProperty(`--${k}`, v);
      });
    };

    apply(role);

    // Watch localStorage for role changes (simple polling fallback)
    const handler = () => {
      const newRole = guessRoleFromStorage();
      if (newRole !== role) setRole(newRole);
    };

    const id = setInterval(handler, 2000);
    return () => clearInterval(id);
  }, [role]);

  return (
    <ThemeContext.Provider value={{ role, setRole }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);

export default ThemeProvider;