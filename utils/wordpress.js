export const BASE_URL = 'https://nextjs-amazon-wp.wpupskills.com';
export const BASE_URL_WPJSON = 'https://nextjs-amazon-wp.wpupskills.com/wp-json';
export const BASE_URL_WPJSON_WP_V2 = 'https://nextjs-amazon-wp.wpupskills.com/wp-json/wp/v2';
import axios from 'axios';

const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
export const WooCommerce = new WooCommerceRestApi({
  url: BASE_URL,
  consumerKey: 'ck_6678c5b46eff320cb2c4b4921c2c524725ff09e8',
  consumerSecret: 'cs_abd644c0fc2c4a3f7dbaefb9b438db4e3fe950fd',
  version: 'wc/v3'
});

// error fixing in woocommerce-rest-api: Refused to set unsafe header "User-Agent"
axios.interceptors.request.use(function (config) {
  const { headers = {} } = config || {}
  if (headers['User-Agent']) delete config.headers['User-Agent']

  return config
})