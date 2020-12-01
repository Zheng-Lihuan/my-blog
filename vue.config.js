module.exports={


  devServer:{
    port:'8080',
    https:false,
    proxy:{
      '/api/v1':{
        target:'http://localhost:4000',
        changeOrigin:true,
      },
      '/api':{
        target:'http://localhost:3000',
        changeOrigin:true,
      },
      
    }

  }
}