export enum Savings {
    EmergencyFund = 'EMERGENCY_FUND',
    Regular = 'REGULAR_SAVINGS',
    Digital = 'DIGITAL_SAVINGS',
    Health = 'HEALTH_SAVINGS',
}

export abstract class DbNames {
    static readonly USERS = 'users';
    static readonly JOBS = 'jobs';
}

export abstract class ReferenceOptions {
    static readonly CASCADE = 'CASCADE';
}
