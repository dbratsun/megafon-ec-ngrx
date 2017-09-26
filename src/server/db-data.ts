import { User } from "shared/model/user";
import { Abonent } from "shared/model/abonent";
import { AbonentGroup } from "shared/model/abonentgroup";
import { Location } from "shared/model/location";

export const dbUsers: { [key: number]: User } = {
    1: {
        id: 1,
        userName: 'Scott'
    },
    2: {
        id: 2,
        userName: 'Bob'
    },
    3: {
        id: 3,
        userName: 'Alice'
    }
}

export const dbAbonentGroups: { [key: number]: AbonentGroup } = {
    1: {
        id: 74,
        title: 'Mosk GT-R',
        iId: 5399
    },
    2: {
        id: 70,
        title: 'Mosk FF',
        iId: 4795
    },
    3: {
        id: 88,
        title: 'SP Федотова',
        iId: 12768 
    }    
}

export const dbAbonents: { [key: number]: Abonent } = {
    1: {
        id: 235,
        abonentGroupId: 74,
        msisdn: 79261199272,
        name: 'Стрелков',
        iId: 2217498
    },
    2: {
        id: 203,
        abonentGroupId: 74,
        msisdn: 79268007268,
        name: 'Бочков',
        iId: 2217472        
    },    
    3: {
        id: 103,
        abonentGroupId: 70,
        msisdn: 79268007843,
        name: 'Богатырев Михаил',
        iId: 2217419        
    },    
    4: {
        id: 163,
        abonentGroupId: 70,
        msisdn: 79268007853,
        name: 'Кораблев Александр',
        iId: 2217429        
    },    
    5: {
        id: 217,
        abonentGroupId: 70,
        msisdn: 79268007833,
        name: 'Усиков Дмитрий',
        iId: 2217409       
    },    
    6: {
        id: 290,
        abonentGroupId: 88,
        msisdn: 79303628042,
        name: 'Абрамов',
        iId: 3088154
    },    
    7: {
        id: 291,
        abonentGroupId: 88,
        msisdn: 79200338015,
        name: 'Шарейко',
        iId: 3154146
    }
}

export const dbLocations: { [key: number]: Location } = {
    1: {
        id: 3256845,
        abonentId: 235,
        lat: 55.69105654,
        lon: 37.86565975,
        time: new Date('2017-09-04 10:04:45.5470000'),
        iId: 854910381        
    },
    2: {
        id: 3257076,
        abonentId: 235,
        lat: 55.70820436,
        lon: 37.82147025,
        time: new Date('2017-09-04 10:35:08.7700000'),
        iId: 854932802        
    },
    3: {
        id: 3257172,
        abonentId: 235,
        lat: 55.71936406,
        lon: 37.72868777,
        time: new Date('2017-09-04 10:49:10.8930000'),
        iId: 854943645        
    },
    4: {
        id: 3257353,
        abonentId: 235,
        lat: 55.71611348,
        lon: 37.68305353,
        time: new Date('2017-09-04 11:14:59.5570000'),
        iId: 854967589        
    },
    5: {
        id: 3260531,
        abonentId: 235,
        lat: 55.70269511,
        lon: 37.76831686,
        time: new Date('2017-09-04 19:02:48.9570000'),
        iId: 855298297        
    },
    6: {
        id: 3260682,
        abonentId: 235,
        lat: 55.68825571,
        lon: 37.86174659,
        time: new Date('2017-09-05 08:05:26.9470000'),
        iId: 855793684
    },
    7: {
        id: 3262168,
        abonentId: 235,
        lat: 55.7580604,
        lon: 37.84694841,
        time: new Date('2017-09-05 11:49:37.2000000'),
        iId: 855962530        
    },
    8: {
        id: 3262347,
        abonentId: 235,
        lat: 55.91337855,
        lon: 37.81781788,
        time: new Date('2017-09-05 12:18:47.5670000'),
        iId: 855986441        
    },
    9: {
        id: 3263644,
        abonentId: 235,
        lat: 55.883036,
        lon: 37.480229,
        time: new Date('2017-09-05 15:15:56.0000000'),
        iId: 856123417        
    },
    10: {
        id: 3264167,
        abonentId: 235,
        lat: 56.01747873,
        lon: 37.27062104,
        time: new Date('2017-09-05 16:31:25.0000000'),
        iId: 856178347        
    }
}

