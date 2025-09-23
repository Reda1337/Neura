/**
 * Essential Test Utilities
 * 
 * Basic custom Jest matchers for React Native component testing
 */

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeAccessible(): R;
      toBeResponsive(): R;
    }
  }
}

// Custom Jest matchers
expect.extend({
  // Check if component is accessible
  toBeAccessible(received: any) {
    const props = received.props || received._props || {};
    const children = received.children || [];
    const type = received.type || '';
    
    // Get accessibility properties
    const hasAccessibilityRole = props.accessibilityRole !== undefined;
    const hasAccessibilityLabel = props.accessibilityLabel !== undefined;
    const hasTextContent = children.some((child: any) => typeof child === 'string');
    
    // Different elements have different requirements
    const isButton = type === 'TouchableOpacity' || props.accessibilityRole === 'button';
    const isText = type === 'Text' || type === 'RCTText';
    
    let isAccessible = false;
    
    if (isButton) {
      isAccessible = hasAccessibilityRole;
    } else if (isText) {
      isAccessible = hasTextContent || hasAccessibilityLabel;
    } else {
      isAccessible = hasAccessibilityRole || hasTextContent;
    }
    
    return {
      message: () =>
        isAccessible
          ? `Expected element not to be accessible`
          : `Expected element to be accessible`,
      pass: isAccessible,
    };
  },

  // Check if component is responsive to user interaction
  toBeResponsive(received: any) {
    const props = received.props || received._props || {};
    
    const hasOnPress = props.onPress !== undefined;
    const hasClickHandler = props.onClick !== undefined;
    const hasResponderHandlers = props.onStartShouldSetResponder !== undefined;
    const isNotDisabled = props.accessibilityState?.disabled !== true && props.disabled !== true;
    const hasButtonRole = props.accessibilityRole === 'button';
    
    // Element should be interactive
    const isInteractive = hasOnPress || (hasClickHandler && hasButtonRole) || (hasResponderHandlers && hasButtonRole);
    const pass = isInteractive && isNotDisabled;
    
    return {
      message: () =>
        pass
          ? `Expected element not to be responsive`
          : `Expected element to be responsive (have interaction handlers and not disabled)`,
      pass,
    };
  },
});