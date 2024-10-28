# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability in PromptFi, please report it responsibly:

### How to Report

1. **DO NOT** create a public GitHub issue for the vulnerability
2. Email us at: security@promptfi.io (or create a private security advisory)
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Status Update**: Within 7 days
- **Fix Timeline**: Depends on severity
  - Critical: 1-7 days
  - High: 7-14 days
  - Medium: 14-30 days
  - Low: 30-90 days

### Disclosure Policy

- We will work with you to understand the issue
- We will notify you when a fix is ready
- We will credit you in the security advisory (if desired)
- Please allow us time to patch before public disclosure

## Security Best Practices

### For Users

1. **Wallet Security**
   - Use hardware wallets for large amounts
   - Never share private keys
   - Verify contract addresses
   - Check transaction details before signing

2. **Smart Contract Interaction**
   - Always verify contract addresses
   - Start with small amounts
   - Use testnets first
   - Read transaction details carefully

3. **IPFS/Metadata**
   - Verify metadata URIs
   - Check content before minting
   - Use trusted IPFS gateways

### For Developers

1. **Code Security**
   - Follow Solidity best practices
   - Use latest OpenZeppelin contracts
   - Implement ReentrancyGuard
   - Add input validation
   - Use SafeMath (implicit in 0.8+)

2. **Testing**
   - Write comprehensive tests
   - Test edge cases
   - Use fuzzing tools
   - Test on testnets
   - Conduct security audits

3. **Access Control**
   - Use Ownable pattern
   - Implement role-based access
   - Protect admin functions
   - Use multi-sig for critical operations

## Known Security Considerations

### Smart Contracts

1. **Reentrancy Protection**
   - All financial functions use ReentrancyGuard
   - Pull payment pattern for withdrawals

2. **Integer Overflow**
   - Solidity 0.8+ has built-in overflow protection
   - Additional checks for critical operations

3. **Access Control**
   - Ownable for admin functions
   - Authorization checks for updaters
   - Creator verification system

4. **Front-Running**
   - Consider transaction ordering
   - Use commit-reveal for sensitive operations

### Frontend

1. **Input Validation**
   - Validate all user inputs
   - Sanitize data before display
   - Check contract responses

2. **Wallet Connection**
   - Use established libraries (wagmi, viem)
   - Verify network before transactions
   - Handle errors gracefully

3. **IPFS**
   - Verify content hashes
   - Use multiple gateways
   - Implement content validation

## Security Measures

### Implemented

- ✅ ReentrancyGuard on financial functions
- ✅ Access control with Ownable
- ✅ Pull payment pattern
- ✅ Input validation
- ✅ Event logging for transparency
- ✅ Comprehensive testing

### Planned

- [ ] Professional security audit
- [ ] Bug bounty program
- [ ] Multi-sig for admin operations
- [ ] Timelock for critical changes
- [ ] On-chain governance

## Audit Status

**Current Status**: Not yet audited

**Planned Audits**:
- Preliminary code review
- Professional audit by reputable firm
- Public bug bounty program

## Bug Bounty

We plan to launch a bug bounty program:

**Rewards** (tentative):
- Critical: Up to $10,000
- High: Up to $5,000
- Medium: Up to $2,000
- Low: Up to $500

**Scope**:
- Smart contracts
- Frontend application
- Backend infrastructure
- IPFS integration

**Out of Scope**:
- Third-party dependencies
- Already known issues
- Testnets

## Contact

- **Security Email**: security@promptfi.io
- **GitHub Security**: Use private security advisories
- **Discord**: #security channel

## Acknowledgments

We thank the following researchers for responsible disclosure:
- [To be updated]

---

**Remember**: Security is everyone's responsibility. If you see something, say something.

