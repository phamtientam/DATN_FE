module.exports = {
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        '@services': '@/services', // Alias cho thư mục services
      }
    }
  },
  devServer: {
    proxy: 'http://127.0.0.1:8000', // Đổi thành URL của server API
  }
};

