import Util from '@/libs/util';

const home = {
    gateway(params) {
        return Util.fetch({
            url: 'gateway?offset=0&limit=1',
            method: 'get'
        })
    },
    node(data) {
        return Util.fetch({
            url: 'node?offset=0&limit=1',
            method: 'get'
        })
    }
};

export default home;