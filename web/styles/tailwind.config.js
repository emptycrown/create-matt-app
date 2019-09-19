const theme = require('./theme');
const Color = require('color');

module.exports = {
  theme: {
    extend: {
      colors: theme.colors,
      boxShadow: {
        outline: `0 0 0 3px ${Color(theme.colors.brightpurple)
          .fade(0.5)
          .hsl()
          .string()}`,
      },
    },
  },
  variants: {},
  plugins: [],
};
