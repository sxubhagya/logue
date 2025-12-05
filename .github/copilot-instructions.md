# Copilot Instructions for Logue

## Project Overview

Logue is a real-time screenwriting software designed to facilitate collaborative screenplay writing with live collaboration features.

## General Guidelines

### Code Style
- Follow clean code principles with clear, descriptive naming
- Write self-documenting code with meaningful variable and function names
- Keep functions focused and single-purpose
- Use consistent indentation and formatting

### Documentation
- Add comments for complex logic or non-obvious implementations
- Document public APIs and interfaces
- Keep README.md updated with project changes
- Include examples in documentation where helpful

### Testing
- Write tests for new features and bug fixes
- Ensure tests are clear and maintainable
- Test edge cases and error conditions
- Keep test coverage high for critical functionality

### Version Control
- Write clear, descriptive commit messages
- Keep commits atomic and focused
- Follow conventional commit format when applicable

## Project-Specific Guidelines

### Screenwriting Domain
- Follow standard screenplay formatting conventions
- Respect industry-standard screenplay structure (Scene Headings, Action, Character, Dialogue, Parentheticals, Transitions)
- Consider real-time collaboration requirements in all implementations
- Maintain formatting integrity across collaborative sessions

### Performance
- Optimize for real-time synchronization
- Consider latency in collaborative features
- Implement efficient data structures for screenplay content
- Handle large screenplay documents gracefully

### User Experience
- Prioritize writer productivity and flow
- Minimize interruptions to the writing process
- Provide intuitive keyboard shortcuts
- Ensure responsive UI for real-time updates

## Best Practices

### Security
- Never commit sensitive data or credentials
- Validate and sanitize all user inputs
- Implement proper authentication for collaborative features
- Protect against injection attacks

### Error Handling
- Provide meaningful error messages to users
- Handle network failures gracefully in real-time features
- Implement proper logging for debugging
- Fail gracefully without data loss

### Dependencies
- Keep dependencies up to date
- Evaluate new dependencies carefully
- Prefer well-maintained, widely-used libraries
- Document the purpose of each major dependency

## Contributing

When contributing to this project:
1. Understand the screenplay writing workflow
2. Test changes with realistic screenplay content
3. Consider multi-user scenarios for collaborative features
4. Ensure changes don't break existing functionality
5. Follow the existing code structure and patterns
