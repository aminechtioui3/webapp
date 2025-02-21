export class Properties{
    static instance: Properties;

    public baseURL;

    public GetUser;
    
    public ActivateMembership;

    private constructor(){
        this.baseURL = "http://localhost:8080";
        this.GetUser = "/api/v1/fake";
        this.ActivateMembership="/protected/active-membership/start-active-membership";
    }
    

    public static getInstance(){
        if(Properties.instance == null)
            Properties.instance = new Properties();
        return Properties.instance;
    }
}
