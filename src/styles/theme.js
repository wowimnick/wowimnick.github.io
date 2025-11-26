// src/theme.js

/**
 * 🎨 THEME CONFIGURATION
 * Theme: Sunset
 * - Primary Color: #ff5722 (Sunset Orange)
 * - Accent/Hover: #e64a19 (Deep Orange)
 * - Border Radius: 12px (inputs) / 16px (cards)
 * - Control Height: 44px (Mobile friendly)
 */

// 1. Define Palette & Prevent Mutation
const colors = Object.freeze({
  primary: "#ff5722",
  primaryHover: "#e64a19",
  success: "#10b981",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",
  lightBg: "#fff9f0", // Warm neutral background
  border: "#f1f5f9",
  textPrimary: "#334155",
  textSecondary: "#64748b",
  chart: Object.freeze({
    blue: "#3b82f6",
    green: "#10b981",
    purple: "#8b5cf6",
    orange: "#f97316",
    red: "#ef4444",
    teal: "#14b8a6",
    yellow: "#eab308",
  }),
});

// 2. Define Font Stack
// Ensure 'var(--font-proxima-soft)' is defined in your CSS or standard system fonts will be used.
const fontStack = 'var(--font-proxima-soft), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

// 3. Create Theme Configuration
const themeConfig = {
  token: {
    // Colors
    colorPrimary: colors.primary,
    colorError: colors.error,
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorInfo: colors.info,
    colorLink: colors.primary,

    // Text
    colorTextBase: colors.textPrimary,
    colorText: colors.textPrimary,
    colorTextSecondary: colors.textSecondary,
    colorTextTertiary: '#94a3b8',
    colorTextQuaternary: '#cbd5e1',
    colorPrimaryHover: colors.primaryHover,

    // Borders & Backgrounds
    colorBorder: colors.border,
    colorBorderSecondary: '#e2e8f0',
    colorBgBase: '#FFFFFF',
    colorBgContainer: '#FFFFFF',
    colorBgLayout: colors.lightBg,
    colorBgElevated: '#FFFFFF',

    // Global Metrics
    fontFamily: fontStack,
    fontSize: 14,
    borderRadius: 16,        // Global container radius
    controlHeight: 44,       // Tall inputs for better touch targets
    
    // Spacing
    marginXS: 8,
    margin: 16,
    marginLG: 24,
    paddingXS: 8,
    padding: 16,
    paddingLG: 24,
    controlPaddingHorizontal: 16,
  },
  
  components: {
    Button: {
      colorPrimary: colors.primary,
      algorithm: true,
      controlHeight: 40,      // Buttons slightly shorter than inputs for visual balance
      borderRadius: 12,
      paddingInline: 20,
      fontWeight: 600,
      fontFamily: fontStack,
    },
    Input: {
      controlHeight: 44,
      controlHeightLG: 44,    // Ensure 'large' inputs match design system
      borderRadius: 12,
      paddingInline: 16,
      paddingBlock: 10,
      fontFamily: fontStack,
      activeBorderColor: colors.primary,
      hoverBorderColor: colors.primary,
    },
    Select: {
      controlHeight: 44,
      controlHeightLG: 44,
      borderRadius: 12,
      fontFamily: fontStack,
      colorPrimary: colors.primary,
    },
    DatePicker: {
      controlHeight: 44,
      borderRadius: 12,
      fontFamily: fontStack,
      colorPrimary: colors.primary,
    },
    InputNumber: {
      controlHeight: 44,
      borderRadius: 12,
      fontFamily: fontStack,
      colorPrimary: colors.primary,
    },
    Checkbox: {
      borderRadius: 4,
      fontFamily: fontStack,
      colorPrimary: colors.primary,
    },
    Radio: {
      fontFamily: fontStack,
      colorPrimary: colors.primary,
    },
    Card: {
      borderRadiusLG: 16,
      fontFamily: fontStack,
      boxShadowTertiary: '0 4px 12px rgba(0,0,0,0.05)', // Soft shadow
    },
    Modal: {
      borderRadiusLG: 16,
      fontFamily: fontStack,
      titleFontSize: 20,
    },
    Steps: {
      fontFamily: fontStack,
      descriptionMaxWidth: 140,
      colorPrimary: colors.primary,
    },
    Upload: {
      fontFamily: fontStack,
      actionsColor: colors.textSecondary,
      colorPrimary: colors.primary,
    },
    Typography: {
      fontFamily: fontStack,
    },
    // Notification & Message styling
    Notification: {
      borderRadiusLG: 12,
      fontFamily: fontStack,
    },
    Message: {
      borderRadius: 8,
      fontFamily: fontStack,
      contentPadding: '10px 16px',
    },
  },
};

// 4. Deep Freeze Helper
function deepFreeze(obj) {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    if (
      obj[prop] !== null &&
      (typeof obj[prop] === "object" || typeof obj[prop] === "function") &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop]);
    }
  });
  return obj;
}

// 5. Export Frozen Theme
export const theme = deepFreeze(themeConfig);

// 6. Export Colors for use in styled-components if needed
export { colors };