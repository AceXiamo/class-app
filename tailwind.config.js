/** @type {import('tailwindcss').Config} */
const path = require('path');

module.exports = {
  content: [
    path.join(__dirname, './index.html'),
    path.join(__dirname, './src/**/*.{html,js,ts,jsx,tsx,vue}'),
  ],
  theme: {
    extend: {
      borderRadius: {
        '1/2': '50%',
      },
      zIndex: {
        '9999': '9999',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--gradient-color-stops))',
        'gradient-radial-circle-tl': 'radial-gradient(circle at top left, var(--tw-gradient-stops))',
        'gradient-radial-circle-tr': 'radial-gradient(circle at top right, var(--tw-gradient-stops))',
      },
      colors: {
        default: {
          DEFAULT: '#02BEBD',
          'thin': '#A9EFEF',
          'light': '#F5FBFB',
          'thin2': '#DBF5EF',
        },
        red: {
          'FC4545': '#FC4545',
          'F53F3F': '#F53F3F',
        },

        purple: {
          '1F065A': '#1F065A',
          'DDCFFE': '#DDCFFE',
        },

        green: {
          '4ED183': '#4ED183',
        },
        orange: {
          'FFECCA': '#FFECCA',
          'FFB026': '#FFB026',
        },
        repeat: {
          '11': '#111111',
          '22': '#222222',
          '24': '#242424',
          '33': '#333333',
          '35': '#353535',
          '44': '#444444',
          '55': '#555555',
          '66': '#666666',
          '6b': '#6b6b6b',
          '70': '#707070',
          '77': '#777777',
          '88': '#888888',
          '97': '#979797',
          '99': '#999999',
          'aa': '#aaaaaa',
          'a6': '#a6a6a6',
          'bb': '#bbbbbb',
          'c1': '#c1c1c1',
          'cc': '#cccccc',
          'd8': '#d8d8d8',
          'dd': '#dddddd',
          'e6': '#e6e6e6',
          'ee': '#eeeeee',
          'ef': '#efefef',
          'f7': '#f7f7f7',
          'f9': '#f9f9f9',
          'fb': '#fbfbfb',

          'f2': '#f2f2f2',
          'f3': '#f3f3f3',
          'f4': '#f4f4f4',
          'f5': '#f5f5f5',
          '97': '#e9e7ef',
          '79': '#797979',
          'w07': 'rgba(255,255,255,0.7)',
        }
      },
      fontSize: {
        ss: ['22rpx', {
          lineHeight: '32rpx'
        }],
        xs: ['24rpx', {
          lineHeight: '32rpx'
        }],
        sm: ['28rpx', {
          lineHeight: '40rpx'
        }],
        base: ['32rpx', {
          lineHeight: '48rpx'
        }],
        '4.25': ['32rpx', {
          lineHeight: '1'
        }],
        lg: ['36rpx', {
          lineHeight: '56rpx'
        }],
        '4.75': ['38rpx', {
          lineHeight: '1'
        }],
        xl: ['40rpx', {
          lineHeight: '58rpx'
        }],
        '2xl': ['48rpx', {
          lineHeight: '64rpx'
        }],
        '6.75': ['54rpx', {
          lineHeight: '1'
        }],
        '3xl': ['60rpx', {
          lineHeight: '72rpx'
        }],
        '4xl': ['72rpx', {
          lineHeight: '80rpx'
        }],
        '5xl': ['96rpx', {
          lineHeight: '1'
        }],
        '6xl': ['120rpx', {
          lineHeight: '1'
        }],
        '7xl': ['144rpx', {
          lineHeight: '1'
        }],
        '8xl': ['192rpx', {
          lineHeight: '1'
        }],
        '9xl': ['256px', {
          lineHeight: '1'
        }]
      },
      spacing: {
        '0.125': '2rpx',
        '0.5': '4rpx',
        '0.75': '6rpx',
        '1': '8rpx',
        '1.25': '10rpx',
        '1.5': '12rpx',
        '1.75': '14rpx',
        '2': '16rpx',
        '2.5': '20rpx',
        '2.75': '22rpx',
        '3': '24rpx',
        '3.25': '26rpx',
        '3.5': '28rpx',
        '3.75': '30rpx',
        '3.875': '31rpx',
        '4': '32rpx',
        '4.375': '35rpx',
        '4.5': '36rpx',
        '4.75': '38rpx',
        '5': '40rpx',
        '5.125': '41rpx',
        '5.5': '44rpx',
        '5.75': '46rpx',
        '6': '48rpx',
        '6.25': '50rpx',
        '6.5': '52rpx',
        '6.75': '54rpx',
        '7': '56rpx',
        '7.5': '60rpx',
        '7.75': '62rpx',
        '8': '64rpx',
        '9': '72rpx',
        '9.5': '76rpx',
        '9.75': '78rpx',
        '10': '80rpx',
        '10.25': '82rpx',
        '10.5': '84rpx',
        '11': '88rpx',
        '12': '96rpx',
        '12.5': '100rpx',
        '13': '104rpx',
        '13.5': '108rpx',
        '13.75': '110rpx',
        '14': '112rpx',
        '15': '120rpx',
        '15.625': '125rpx',
        '16': '128rpx',
        '17.5': '140rpx',
        '18': '144rpx',
        '20': '160rpx',
        '22.5': '178rpx',
        '22.75': '180rpx',
        '24': '192rpx',
        '25': '200rpx',
        '25.75': '206rpx',
        '26': '208rpx',
        '28': '224rpx',
        '31.25': '250rpx',
        '32': '256rpx',
        '34': '272rpx',
        '36': '288rpx',
        '39.5': '316rpx',
        '40': '320rpx',
        '44': '352rpx',
        '46.5': '372rpx',
        '48': '384rpx',
        '52': '416rpx',
        '56': '448rpx',
        '60': '480rpx',
        '64': '512rpx',
        '72': '576rpx',
        '80': '640rpx',
        '96': '768rpx',
      }
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false
  },
}
