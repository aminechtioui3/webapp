export class Properties{
    static instance: Properties;

    public baseURL;

    public GetUsers;

    public ActivateMembership;

    private constructor(){
        this.baseURL = "https://c645-2c0f-f3a0-98-a7c1-c064-d2ec-228d-aeec.ngrok-free.app/api/v1";
        this.GetUsers = "/protected/active-membership/get-all-active-membership";
        this.ActivateMembership="/protected/active-membership/start-active-membership";
    }
    

    public static getInstance(){
        if(Properties.instance == null)
            Properties.instance = new Properties();
        return Properties.instance;
    }
}
