
// here's your config file,process.env is your env file depending on the environment
// you're running, maybe it's local, pre or prod. 
export default () => {
  return {
    server: {
      port: process.env.PORT,
      domain: process.env.DOMAIN,
      prefix: process.env.PREFIX,
    },
    database: {
      type: process.env.DATABASE_TYPE || "mysql", 
      host: process.env.DATABASE_HOST || "localhost",//localhost
      port: Number(process.env.DATABASE_PORT) || 3306, //3306
      username: process.env.DATABASE_USERNAME || "root", //root
      password: process.env.DATABASE_PASSWORD|| "root" ,
      name: process.env.DB_DATABASE || "dbname",
      synchronize: process.env.DATABASE_SYNCHRONIZE || true,
    },
  
   

  };
};

