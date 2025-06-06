export class Properties {
    static instance: Properties;

    public baseURL;

    public loginURL;

    public GetGymStatics;

    public GetGymMoneyTransactionHistory;

    public GetAllActiveMembership;

    public ActivateMembership;

    public UpdateActiveMembership;

    public DeleteActiveMembership;

    public GetAllActiveMembershipsForUser;

    public GetAllActiveMembershipsByMembership;

    public GetActiveMembershipById;

    public CreateDeal;

    public UpdateDeal;

    public DeleteDeal;

    public GetDealById;

    public GetAllDeals;

    public GetAllExercises;

    public CreateExercise;

    public UpdateExercise;

    public DeleteExercise;

    public GetExerciseById;

    public GetAllExercisesBySessionId;

    public CreateMembership;

    public UpdateMembership;

    public DeleteMembership;

    public GetMembershipById;

    public GetAllMemberships;

    public CreateNews;

    public UpdateNews;

    public DeleteNews;

    public GetNewsById;

    public GetAllNews;

    public CreateNotification;

    public DeleteNotification;

    public GetNotificationById;

    public GetAllNotifications;

    public GetAllNotificationsForUser;

    public CreateProduct;

    public UpdateProduct;

    public DeleteProduct;

    public GetProductById;

    public GetAllProducts;

    public CreateProductCategory;

    public UpdateProductCategory;

    public DeleteProductCategory;

    public GetAllProductCategory;

    public GetProductCategoryById;

    public CreateProductOrder;

    public UpdateProductOrder;

    public DeleteProductOrder;

    public GetAllProductOrders;

    public GetAllProductOrderByUserId;

    public GetAllProductOrdersByProductId;

    public GetProductOrderById;

    public CreateReminder;

    public UpdateReminder;

    public DeleteReminder;

    public GetAllReminders;

    public GetReminderById;

    public CreateSession;

    public UpdateSession;

    public DeleteSession;

    public GetAllSessions;

    public GetSessionById;

    public GetAccountById;

    public GetAllAccounts;

    public CreateMobileAccount;

    public UpdateMobileAccount;

    public UpdateMobileAccountByAdmin;

    public DeleteAccount;

    public UpdatePassword;

    public UpdatePasswordByAdmin;

    public UpdateLastSeen;

    public createExpense;

    public updateExpense;

    public deleteExpense;

    public getExpenseById;

    public getAllExpenses;

    public createHistory;

    public deleteHistory;

    public markHistoryAsSeen;

    public getAllHistory;

    public getLastHistoryNotifications;

    
    public createGymFacility;

    public updateGymFacility;

    public deleteGymFacility;

    public getGymFacilityById;

    public getAllGymFacilities;




    private constructor() {
        // this.baseURL = "https://gymapp-production-e339.up.railway.app/api/v1";
          this.baseURL = "https://family-gym.online:5000/api/v1";

        // GYM INFO
        this.GetGymStatics="/protected/gym-info/get-gym-statics";
        this.GetGymMoneyTransactionHistory="/protected/gym-info/get-gym-money-transaction-history";



        // Active Membership
        this.ActivateMembership = "/protected/active-membership/start-active-membership";
        this.UpdateActiveMembership = "/protected/active-membership/update-active-membership";
        this.DeleteActiveMembership = "/protected/active-membership/delete-active-membership";
        this.GetAllActiveMembership = "/protected/active-membership/get-all-active-membership";
        this.GetAllActiveMembershipsForUser = "/connected/active-membership/get-all-active-membership-for-user";
        this.GetAllActiveMembershipsByMembership = "/protected/active-membership/get-all-active-membership-by-membership";
        this.GetActiveMembershipById = "/protected/active-membership/get-active-membership";

        // Deal
        this.CreateDeal = "/protected/deal/create-deal";
        this.UpdateDeal = "/protected/deal/update-deal";
        this.DeleteDeal = "/protected/deal/delete-deal";
        this.GetDealById = "/connected/deal/get-deal-by-id";
        this.GetAllDeals = "/connected/deal/get-all-deals";

        // GYM
        this.createGymFacility="/protected/gym/create-gym-facility";
        this.updateGymFacility="/protected/gym/update-gym-facility";
        this.deleteGymFacility="/protected/gym/delete-gym-facility";
        this.getGymFacilityById="/connected/gym/get-gym-facility-by-id";
        this.getAllGymFacilities="/connected/gym/get-all-gym-facilities";


        // Exercise
        this.GetAllExercises = "/connected/exercise/get-all-exercises";
        this.CreateExercise = "/protected/exercise/create-exercise";
        this.UpdateExercise = "/protected/exercise/update-exercise";
        this.DeleteExercise = "/protected/exercise/delete-exercise";
        this.GetExerciseById = "/connected/exercise/get-exercise-by-id";
        this.GetAllExercisesBySessionId = "/connected/exercise/get-all-exercises-by-session-id";

        // Membership
        this.CreateMembership = "/protected/membership/create-membership";
        this.UpdateMembership = "/protected/membership/update-membership";
        this.DeleteMembership = "/protected/membership/delete-membership";
        this.GetMembershipById = "/connected/membership/get-membership-by-id";
        this.GetAllMemberships = "/connected/membership/get-all-memberships";

        // News
        this.CreateNews = "/protected/news/create-news";
        this.UpdateNews = "/protected/news/update-news";
        this.DeleteNews = "/protected/news/delete-news";
        this.GetNewsById = "/connected/news/get-news-by-id";
        this.GetAllNews = "/connected/news/get-all-news";


        // Expense
        this.createExpense="/protected/Expense/create-expense";
        this.updateExpense="/protected/Expense/update-expense";
        this.deleteExpense="/protected/Expense/delete-expense";
        this.getExpenseById="/protected/Expense/get-expense-by-id";
        this.getAllExpenses="/protected/Expense/get-all-expenses";


        // HISTORY
        this.createHistory="/protected/history/create-history";
        this.deleteHistory="/protected/history/delete-history/{id}";
        this.markHistoryAsSeen="/protected/history/mark-history-as-seen/{id}";
        this.getAllHistory="/protected/history/get-all-history";
        this.getLastHistoryNotifications="/protected/history/get-all-history-notifications";


        // Notifications
        this.CreateNotification = "/protected/notification/create-notification";
        this.DeleteNotification = "/protected/notification/delete-notification";
        this.GetNotificationById = "/connected/notification/get-notification-by-id";
        this.GetAllNotifications = "/protected/notification/get-all-notifications";
        this.GetAllNotificationsForUser = "/connected/notification/get-all-notifications-for-user";

        // Product
        this.CreateProduct = "/protected/product/create-product";
        this.UpdateProduct = "/protected/product/update-product";
        this.DeleteProduct = "/protected/product/delete-product";
        this.GetProductById = "/connected/product/get-product-by-id";
        this.GetAllProducts = "/connected/product/get-all-products";

        // Product Category
        this.CreateProductCategory = "/protected/product/category/create-product-category";
        this.UpdateProductCategory = "/protected/product/category/update-product-category";
        this.DeleteProductCategory = "/protected/product/category/delete-product-category";
        this.GetAllProductCategory = "/connected/product/category/get-all-product-category";
        this.GetProductCategoryById = "/connected/product/category/get-product-category-by-id";

        // Product Order
        this.CreateProductOrder = "/protected/product/order/create-product-order";
        this.UpdateProductOrder = "/protected/product/order/update-product-order";
        this.DeleteProductOrder = "/connected/product/order/delete-product-order";
        this.GetAllProductOrders = "/protected/product/order/get-all-product-orders";
        this.GetAllProductOrderByUserId = "/connected/product/order/get-all-product-orders-by-userId";
        this.GetAllProductOrdersByProductId = "/protected/product/order/get-all-product-orders-by-product-id";
        this.GetProductOrderById = "/connected/product/order/get-product-order-By-id";

        // Reminder
        this.CreateReminder = "/protected/reminder/create-reminder";
        this.UpdateReminder = "/protected/reminder/update-reminder";
        this.DeleteReminder = "/protected/reminder/delete-reminder";
        this.GetAllReminders = "/connected/reminder/get-all-reminders";
        this.GetReminderById = "/connected/reminder/get-reminder-";

        // Session
        this.CreateSession = "/protected/session/create-session";
        this.UpdateSession = "/protected/session/update-session";
        this.DeleteSession = "/protected/session/delete-session";
        this.GetAllSessions = "/connected/session/get-all-sessions";
        this.GetSessionById = "/connected/session/get-session-by-id";

        // Account
        this.GetAccountById = "/connected/account/get-account-by-id";
        this.GetAllAccounts = "/protected/account/get-all-accounts";
        this.CreateMobileAccount = "/public/account/create-mobile-account";
        this.UpdateMobileAccount = "/connected/account/update-mobile-account";
        this.UpdateMobileAccountByAdmin = "/protected/account/update-mobile-account-by-admin";
        this.DeleteAccount = "/protected/account/delete-account";
        this.loginURL = "/public/account/login-account";
        this.UpdatePassword = "/connected/account/update-password";
        this.UpdatePasswordByAdmin = "/protected/account/update-password-by-admin";
        this.UpdateLastSeen = "/connected/account/update-last-seen";
    }

    public static getInstance() {
        if (Properties.instance == null)
            Properties.instance = new Properties();
        return Properties.instance;
    }
}
