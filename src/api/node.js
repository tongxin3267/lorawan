import Util from '@/libs/util';

const node = {
    url: 'node',
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
            url: `${this.url}/${data.devEUI}`,
            method: 'put',
            data
        })
    },
    delete(devEUI) {
        return Util.fetch({
            url: `${this.url}/${devEUI}`,
            method: 'delete'
        })
    }
};

export default node;