/** @type {import('next').NextConfig} */

const { i18n } = require('./next-i18next.config');
const intercept = require('intercept-stdout');

function interceptStdout(text) {
  if (text.includes('Duplicate atom key')) {
    return '';
  }
  return text;
}

intercept(interceptStdout);

module.exports = {
  reactStrictMode: true,
  i18n,
};
