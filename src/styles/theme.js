import { tokens } from './tokens';

const colors = Object.freeze({
  primary: tokens.brand,
  primaryHover: tokens.brandDeep,
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  info: '#3b82f6',
  lightBg: tokens.surfaceWarm,
  border: tokens.hairline,
  textPrimary: tokens.ink,
  textSecondary: tokens.grey,
  chart: Object.freeze({
    blue: '#3b82f6',
    green: '#10b981',
    purple: '#8b5cf6',
    orange: tokens.brand,
    red: tokens.brandDeep,
    teal: '#14b8a6',
    yellow: tokens.gold,
  }),
});

const fontStack = tokens.font;

const themeConfig = {
  token: {
    colorPrimary: colors.primary,
    colorError: colors.error,
    colorSuccess: colors.success,
    colorWarning: colors.warning,
    colorInfo: colors.info,
    colorLink: colors.primary,
    colorTextBase: colors.textPrimary,
    colorText: colors.textPrimary,
    colorTextSecondary: colors.textSecondary,
    colorTextTertiary: tokens.greyLight,
    colorTextQuaternary: tokens.hairline,
    colorPrimaryHover: colors.primaryHover,
    colorBorder: colors.border,
    colorBorderSecondary: tokens.hairline,
    colorBgBase: tokens.surface,
    colorBgContainer: tokens.surface,
    colorBgLayout: tokens.surfaceAlt,
    colorBgElevated: tokens.surface,
    fontFamily: fontStack,
    fontSize: 14,
    borderRadius: 12,
    controlHeight: 44,
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
      controlHeight: 40,
      borderRadius: 12,
      paddingInline: 20,
      fontWeight: 600,
      fontFamily: fontStack,
    },
    Input: {
      controlHeight: 44,
      controlHeightLG: 44,
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
      boxShadowTertiary: tokens.shadowSm,
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

function deepFreeze(obj) {
  Object.freeze(obj);
  Object.getOwnPropertyNames(obj).forEach((prop) => {
    if (
      obj[prop] !== null &&
      (typeof obj[prop] === 'object' || typeof obj[prop] === 'function') &&
      !Object.isFrozen(obj[prop])
    ) {
      deepFreeze(obj[prop]);
    }
  });
  return obj;
}

export const theme = deepFreeze(themeConfig);
export { colors, tokens };
