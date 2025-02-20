export class Properties{
    static instance: Properties;

    public baseURL;

    public GetUser;

    private constructor(){
        this.baseURL = "http://localhost:8080";
        this.GetUser = "/api/v1/fake";
    }
    

    public static getInstance(){
        if(Properties.instance == null)
            Properties.instance = new Properties();
        return Properties.instance;
    }
}
