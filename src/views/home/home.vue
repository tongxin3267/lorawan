<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";
</style>
<template>
    <div class="home-main">
        <Row :gutter="10">
            <Col :md="24" :lg="16">
                <Row :gutter="5">
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="user_created_count"
                            :end-val="count.createUser"
                            iconType="cloud"
                            color="#2d8cf0"
                            :intro-text="$t('gatewayNumber')"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="visit_count"
                            :end-val="count.visit"
                            iconType="location"
                            color="#64d572"
                            :iconSize="50"
                            :intro-text="$t('nodeNumber')"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="collection_count"
                            :end-val="count.collection"
                            iconType="upload"
                            color="#ffd572"
                            :intro-text="$t('dataNumber')"
                        ></infor-card>
                    </Col>
                    <Col :xs="24" :sm="12" :md="6" :style="{marginBottom: '10px'}">
                        <infor-card
                            id-name="transfer_count"
                            :end-val="count.transfer"
                            iconType="shuffle"
                            color="#f25e43"
                            :intro-text="$t('serverNumber')"
                        ></infor-card>
                    </Col>
                </Row>
            </Col>
        </Row>
    </div>
</template>

<script>
import inforCard from './components/inforCard.vue';
import homeModel from '@/api/home.js';
export default {
    name: 'home',
    components: {
        inforCard
    },
    data () {
        return {
            count: {
                createUser: 496,
                visit: 3264,
                collection: 24389305,
                transfer: 39503498
            }
        };
    },
    computed: {
        avatorPath () {
            return localStorage.avatorImgPath;
        }
    },
    methods: {
        init () {
            homeModel.gateway().then(result => {
                this.count.createUser = parseInt(result.totalCount);
            }).catch(err => console.log(err))

            homeModel.node().then(result => {
                this.count.visit = parseInt(result.totalCount);
            }).catch(err => console.log(err))
        }
    },
    mounted () {
        this.init();
    }
};
</script>
