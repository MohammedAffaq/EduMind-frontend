/**
 * User Utility Functions
 * safely handle user data from localStorage
 */

/**
 * Get the full user object from localStorage
 * @returns {Object} User object or empty object if not found
 */
export const getUser = () => {
    try {
        const userStr = localStorage.getItem("user") || localStorage.getItem("currentUser");
        return userStr ? JSON.parse(userStr) : {};
    } catch (error) {
        console.error("Error parsing user data:", error);
        return {};
    }
};

/**
 * Get the full name of the logged-in user
 * @returns {string} Full name or "User"
 */
export const getFullName = () => {
    const user = getUser();
    if (!user) return "User";

    const firstName = user.firstName || user.name || ""; // Handle different schema variations if any
    const lastName = user.lastName || "";

    const fullName = `${firstName} ${lastName}`.trim();
    return fullName || "User";
};

/**
 * Get user role safely
 * @returns {string} User role or empty string
 */
export const getUserRole = () => {
    const user = getUser();
    return user?.role || "";
};
