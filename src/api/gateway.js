import Util from '@/libs/util';

const gateway = {
    url: 'gateway',
    lists(params) {
        return Util.fetch({
            url: `${this.url}?offset=${params.offset}&limit=${params.limit}`,
            method: 'get'
        })
    },
    add(data) {
        return Util.fetch({
            url: this.url,
            method: 'post',
            data
        })
    },
    edit(data) {
        return Util.fetch({
            url: `${this.url}/${data.gatewayEUI}`,
            method: 'put',
            data
        })
    },
    delete(gatewayEUI) {
        return Util.fetch({
            url: `${this.url}/${gatewayEUI}`,
            method: 'delete'
        })
    }
};

export default gateway;