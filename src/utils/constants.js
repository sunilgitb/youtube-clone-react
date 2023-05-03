import moment, { duration } from 'moment'
import format from 'moment-duration-format';
export const list1 = [
    {
        id:1, 
        label:'Home',
        iconOutLined:<span className="material-symbols-outlined">home</span>,
        iconFilled:<span className="material-symbols-filled">home</span>,
        link:'/'
    },
    {
        id:2,
        label:'Shorts',
        iconOutLined:<span className="material-symbols-outlined">play_circle</span>,
        iconFilled:<span className="material-symbols-filled">play_circle</span>,
        link:'/shorts'
    },
    {
        id:3,
        label:'Subscriptions',
        iconOutLined:<span className="material-symbols-outlined">subscriptions</span>,
        iconFilled:<span className="material-symbols-filled">subscriptions</span>,
        link:'/subscriptions'
    },
]
export const list2 = [
    {
        id:4,
        label:'Library',
        iconOutLined:<span className="material-symbols-outlined">video_library</span>,
        iconFilled:<span className="material-symbols-filled">video_library</span>,
        link:'/library'
    },
    {
        id:5,
        label:'History',
        iconOutLined:<span className="material-symbols-outlined">history</span>,
        iconFilled:<span className="material-symbols-filled">history</span>,
        link:'/history'
    },
]
export const list3 = [
    {
        id:6,
        label:'Trending',
        iconOutLined:<span className="material-symbols-outlined">Local_fire_department</span>,
        iconFilled:<span className="material-symbols-filled">Local_fire_department</span>,
        link:'/'
    },
    {
        id:7,
        label:'Music',
        iconOutLined:<span className="material-symbols-outlined">music_note</span>,
        iconFilled:<span className="material-symbols-filled">music_note</span>,
        link:'/'
    },
    {
        id:8,
        label:'Live',
        iconOutLined:<span className="material-symbols-outlined">stream</span>,
        iconFilled:<span className="material-symbols-filled">stream</span>,
        link:'/'
    },
    {
        id:9,
        label:'Gaming',
        iconOutLined:<span className="material-symbols-outlined">sports_esports</span>,
        iconFilled:<span className="material-symbols-filled">sports_esports</span>,
        link:'/'
    },
    {
        id:10,
        label:'News',
        iconOutLined:<span className="material-symbols-outlined">feed</span>,
        iconFilled:<span className="material-symbols-filled">feed</span>,
        link:'/'
    },
    {
        id:11,
        label:'Sports',
        iconOutLined:<span className="material-symbols-outlined">mood</span>,
        iconFilled:<span className="material-symbols-filled">mood</span>,
        link:'/'
    },
    {
        id:12,
        label:'Learing',
        iconOutLined:<span className="material-symbols-outlined">lightbulb</span>,
        iconFilled:<span className="material-symbols-filled">lightbulb</span>,
        link:'/'
    },
    {
        id:13,
        label:'Fashion & Beauty',
        iconOutLined:<span className="material-symbols-outlined">checkroom</span>,
        iconFilled:<span className="material-symbols-filled">checkroom</span>,
        link:'/'
    },
]
export const list4 = [
    {
        id:14,
        label:'Setting',
        iconOutLined:<span className="material-symbols-outlined">settings</span>,
        iconFilled:<span className="material-symbols-filled">settings</span>,
        link:'/'
    },
    {
        id:15,
        label:'Report history',
        iconOutLined:<span className="material-symbols-outlined">flag</span>,
        iconFilled:<span className="material-symbols-filled">flag</span>,
        link:'/'
    },
    {
        id:16,
        label:'Help',
        iconOutLined:<span className="material-symbols-outlined">help</span>,
        iconFilled:<span className="material-symbols-filled">help</span>,
        link:'/'
    },
    {
        id:17,
        label:'Send feedback',
        iconOutLined:<span className="material-symbols-outlined">feed</span>,
        iconFilled:<span className="material-symbols-filled">feed</span>,
        link:'/'
    },
]

export const list5 =[...list1,...list2];

export let listFilterBar=[
    {value:'ALL', id:1},
    {value:'Gaming', id:2},
    {value:'Live', id:3},
    {value:'Music', id:4},
    {value:'Chess', id:5},
    {value:'Woodturning', id:6},
    {value:'Meditation Music', id:7},
    {value:'History', id:8},
    {value:'Deep House', id:9},
    {value:'Tanks', id:10},
    {value:'Aircrafts', id:11},
    {value:'Cooking', id:12},
    {value:'Drawing', id:13},
    {value:'Anime', id:14},
    {value:'Beauty', id:15},
    {value:'Comedy', id:16},
    {value:'Taste', id:17},
];

export const listChannel = [
    {id:1, label:'VIDEOS',link:'videos'},
    {id:2, label:'LIVE',link:'live'},
    {id:3, label:'PLAYLIST',link:'playlists'},
    {id:4, label:'ABOUT',link:'about'},
]
export const processDuration = (dura) => {
    const momentDuration = moment.duration(dura);
    const formattedDuration = momentDuration.format('HH:mm:ss').padStart(4, '0:0');
    return formattedDuration;
}