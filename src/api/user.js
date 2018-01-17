import Util from '@/libs/util';

const user = {
    url: 'system',
    edit(data) {
        return Util.fetch({
            url: `${this.url}/license`,
            method: 'post',
            data
        })
    }
};

export default user;