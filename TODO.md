# Fix Registration Process

## Issues Identified
- send-otp endpoint is mock implementation, doesn't create users or send emails
- verify-otp fails with "User not found" because no user was created
- OTP verification doesn't use otp_verifications model properly
- otp_verifications route not mounted in server.js
- No email sending functionality implemented
- User status field inconsistency (model uses 'active', code uses 'PENDING'/'ACTIVE')

## Tasks
- [ ] Update User model status field to use 'PENDING'/'ACTIVE' instead of 'active'
- [ ] Implement proper send-otp endpoint that creates user with PENDING status and stores OTP
- [ ] Implement email sending functionality using nodemailer
- [ ] Update verify-otp endpoint to validate OTP from otp_verifications model
- [ ] Mount otp_verifications route in server.js
- [ ] Test complete registration flow
