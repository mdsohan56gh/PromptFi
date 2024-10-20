# Contributing to PromptFi

Thank you for your interest in contributing to PromptFi! This document provides guidelines and instructions for contributing.

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers and encourage diverse perspectives
- Focus on constructive feedback
- Respect differing opinions and experiences

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue with:
- Clear description of the bug
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Your environment (OS, browser, etc.)

### Suggesting Features

Feature suggestions are welcome! Please:
- Check if the feature already exists or is planned
- Clearly describe the feature and its benefits
- Provide examples or mockups if possible

### Pull Requests

1. **Fork the repository**
   ```bash
   git clone https://github.com/mdsohan56gh/PromptFi.git
   cd PromptFi
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**
   - Write clear, documented code
   - Follow existing code style
   - Add tests for new features
   - Update documentation

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

   Use conventional commits:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation
   - `test:` Tests
   - `refactor:` Code refactoring
   - `style:` Formatting
   - `chore:` Maintenance

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Describe your changes
   - Reference related issues
   - Wait for review

## Development Setup

### Prerequisites
- Node.js >= 18.0.0
- npm or yarn
- Git

### Setup Steps

1. Install dependencies
   ```bash
   npm install
   cd frontend && npm install
   ```

2. Set up environment variables
   ```bash
   cp .env.example .env
   ```

3. Compile contracts
   ```bash
   npx hardhat compile
   ```

4. Run tests
   ```bash
   npx hardhat test
   ```

5. Start local blockchain
   ```bash
   npx hardhat node
   ```

6. Deploy contracts
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```

7. Start frontend
   ```bash
   cd frontend
   npm run dev
   ```

## Coding Standards

### Solidity
- Follow OpenZeppelin standards
- Use latest Solidity version (0.8.20+)
- Include NatSpec comments
- Write comprehensive tests
- Run security checks

### TypeScript/JavaScript
- Use TypeScript for frontend
- Follow ESLint rules
- Use meaningful variable names
- Write JSDoc comments
- Keep functions small and focused

### Testing
- Write unit tests for all functions
- Include edge cases
- Aim for >80% coverage
- Test both success and failure cases

### Documentation
- Update README if needed
- Document new features
- Include code examples
- Keep API docs current

## Review Process

1. Automated checks must pass
2. At least one maintainer review required
3. All comments must be addressed
4. Code must follow style guidelines
5. Tests must pass

## Community

- **Discord**: Join our community
- **Twitter**: Follow @PromptFi
- **GitHub Discussions**: Ask questions

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Invited to contributor calls

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to ask questions in:
- GitHub Discussions
- Discord
- Create an issue

Thank you for contributing! 🎉

