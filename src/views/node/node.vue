<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
    @import './node.less';
</style>

<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        {{ $t('node') }}
                    </p>
                    <Row>
                        <Input v-model="searchConName" @on-change="handleSearch" icon="search" placeholder="name..." style="width: 200px" />
                        <Input v-model="searchConEui" @on-change="handleSearch" icon="search" placeholder="devEUI..." style="width: 200px" />
                        <Button type="error" @click="deleteData" icon="android-delete" style="float:right">{{ $t('deleteData') }}</Button>
                        <Button type="success" @click="addConfirms" icon="android-add" style="float:right;margin-right:5px">{{ $t('addNode') }}</Button>
                        <Button type="primary" @click="exportExcel" icon="ios-download-outline" style="float:right;margin-right:5px">{{ $t('exportData') }}</Button>
                        <div style="float:right;padding-right:5px">
                            <Upload action="//jsonplaceholder.typicode.com/posts/" accept=".xls,.xlsx,.xlsm" :format="['xls', 'xlsx', 'xlsm']" :show-upload-list="false" :before-upload="importExcel">
                                <Button type="ghost" icon="ios-cloud-upload-outline">{{ $t('importData') }}</Button>
                            </Upload>
                        </div>
                    </Row>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table border :columns="columns" :data="data" :loading="loading" @on-selection-change="selectData"></Table>
                        <div style="margin: 10px;overflow: hidden">
                            <div style="float: right;">
                                <Page :total="counts" show-total show-elevator :page-size="pageSize" @on-change="nextPage"></Page>
                            </div>
                        </div>
                    </Row>
                </Card>
            </Col>
        </Row>
    
        <Modal width="500" v-model="editConfirm.status" :loading="editConfirm.loading" @on-ok="edit('formValidate')" :title="$t('edit')">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="devEUI" prop="devEUI">
                    <Input v-model="formValidate.devEUI" placeholder="devEUI"></Input>
                </FormItem>
                <FormItem label="appEUI" prop="appEUI">
                    <Input v-model="formValidate.appEUI" placeholder="appEUI"></Input>
                </FormItem>
                <FormItem label="appKey" prop="appKey">
                    <Input v-model="formValidate.appKey" placeholder="appKey"></Input>
                </FormItem>
                <Row>
                    <Col span="12">
                        <FormItem label="rx1DROffset" prop="rx1DROffset">
                            <InputNumber v-model="formValidate.rx1DROffset" placeholder="rx1DROffset"></InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="rx2DR" prop="rx2DR">
                            <InputNumber v-model="formValidate.rx2DR" placeholder="rx2DR"></InputNumber>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="rxDelay" prop="rxDelay">
                            <InputNumber v-model="formValidate.rxDelay" placeholder="rxDelay"></InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="rxWindow" prop="rxWindow">
                            <Select v-model="formValidate.rxWindow">
                                <Option value="RX1">RX1</Option>
                                <Option value="RX2">RX2</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
        </Modal>

        <Modal width="500" v-model="addConfirm.status" :loading="addConfirm.loading" @on-ok="add('formValidate1')" :title="$t('add')">
            <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate" :label-width="100">
                <FormItem label="name" prop="name">
                    <Input v-model="formValidate1.name" placeholder="name"></Input>
                </FormItem>
                <FormItem label="devEUI" prop="devEUI">
                    <Input v-model="formValidate1.devEUI" placeholder="devEUI"></Input>
                </FormItem>
                <FormItem label="appEUI" prop="appEUI">
                    <Input v-model="formValidate1.appEUI" placeholder="appEUI"></Input>
                </FormItem>
                <FormItem label="appKey" prop="appKey">
                    <Input v-model="formValidate1.appKey" placeholder="appKey"></Input>
                </FormItem>
                <FormItem label="authCode" prop="authCode">
                    <Input v-model="formValidate1.authCode" placeholder="authCode"></Input>
                </FormItem>
                <Row>
                    <Col span="12">
                        <FormItem :label="$t('isClassC')" prop="isClassC">
                            <i-switch v-model="formValidate1.isClassC" size="large">
                                <span slot="open">{{ $t('yes') }}</span>
                                <span slot="close">{{ $t('no') }}</span>
                            </i-switch>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label="$t('relaxFCnt')" prop="relaxFCnt">
                            <i-switch v-model="formValidate1.relaxFCnt" size="large">
                                <span slot="open">{{ $t('yes') }}</span>
                                <span slot="close">{{ $t('no') }}</span>
                            </i-switch>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem :label="$t('adrInterval')" prop="adrInterval">
                            <InputNumber v-model="formValidate1.adrInterval"></InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem :label="$t('installationMargin')" prop="installationMargin">
                            <InputNumber v-model="formValidate1.installationMargin"></InputNumber>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="rx1DROffset" prop="rx1DROffset">
                            <InputNumber v-model="formValidate1.rx1DROffset"></InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="rx2DR" prop="rx2DR">
                            <InputNumber v-model="formValidate1.rx2DR"></InputNumber>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                        <FormItem label="rxDelay" prop="rxDelay">
                            <InputNumber v-model="formValidate1.rxDelay"></InputNumber>
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="type" prop="type">
                            <InputNumber v-model="formValidate1.type"></InputNumber>
                        </FormItem>
                    </Col>
                </Row>
                <FormItem :label="$t('description')" prop="description">
                    <Input v-model="formValidate1.description" :placeholder="$t('description')"></Input>
                </FormItem>
                <FormItem :label="$t('latitude')" prop="latitude">
                    <Input v-model="formValidate1.latitude" :placeholder="$t('latitude')"></Input>
                </FormItem>
                <FormItem :label="$t('longitude')" prop="longitude">
                    <Input v-model="formValidate1.longitude" :placeholder="$t('longitude')"></Input>
                </FormItem>
                <FormItem label="rxWindow" prop="rxWindow">
                    <Select v-model="formValidate1.rxWindow">
                        <Option value="RX1">RX1</Option>
                        <Option value="RX2">RX2</Option>
                    </Select>
                </FormItem>
            </Form>
        </Modal>

        <Modal width="500" v-model="importConfirm.status" :title="$t('importDetails')">
            <Table border :row-class-name="importConfirm.rowClassName" :columns="importConfirm.columns" :data="importConfirm.data"></Table>
        </Modal>
    </div>
</template>

<script>
import util from '@/libs/util.js';
import XLSX from 'xlsx';
import XLSX_SAVE from 'file-saver';
import nodeModel from '@/api/node.js';
export default {
    name: 'searchable-table',
    data () {
        return {
            importConfirm: {
                status: false,
                columns: [
                    {
                        key: 'id',
                        title: 'devEUI'
                    },
                    {
                        key: 'stats',
                        title: this.$t('stats')
                    }
                ],
                rowClassName: row => {
                    if(row.stats == this.$t('error')){
                        return 'table-error-row';
                    }
                    return '';
                },
                data: []
            },
            editConfirm: {
                status: false,
                loading: true
            },
            addConfirm: {
                status: false,
                loading: true
            },
            formValidate: {},
            formValidate1: {
                name: '',
                devEUI: '',
                adrInterval: 0,
                appEUI: '0000000000000001',
                appKey: '98929b92f09e2daf676d646d0f61d250',
                authCode: '',
                applicationID: '0',
                isClassC: false,
                relaxFCnt: true,
                isABP: true,
                adrInterval: 0,
                description: 'node',
                installationMargin: 20,
                rx1DROffset: 0,
                rx2DR: 0,
                rxDelay: 0,
                rxWindow: 'RX1',
                latitude: '',
                longitude: '',
                type: 0,
                useApplicationSettings: true
            },
            ruleValidate: {
                name: [
                    { required: true, message: this.$t('fillname'), trigger: 'blur' },
                    { type: 'string', max: 20, message: this.$t('dataerror'), trigger: 'blur' }
                ],
                devEUI: [
                    { required: true, message: this.$t('filldevEUI'), trigger: 'blur' },
                    { type: 'string', len: 16, message: this.$t('dataerror'), trigger: 'blur' }
                ],
                appEUI: [
                    { required: true, message: this.$t('fillappEUI'), trigger: 'blur' },
                    { type: 'string', len: 16, message: this.$t('dataerror'), trigger: 'blur' }
                ],
                appKey: [
                    { required: true, message: this.$t('fillappKey'), trigger: 'blur' },
                    { type: 'string', len: 32, message: this.$t('dataerror'), trigger: 'blur' }
                ],
                authCode: [
                    { required: true, message: this.$t('fillauthCode'), trigger: 'blur' },
                ]
            },
            searchConName: '',
            searchConEui: '',
            loading: true,
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    key: 'name',
                    title: 'name'
                },
                {
                    key: 'devEUI',
                    title: 'devEUI'
                },
                {
                    key: 'appKey',
                    title: 'appKey'
                },
                {
                    key: 'time',
                    title: this.$t('onlineTime')
                },
                {
                    title: this.$t('operation'),
                    key: 'action',
                    width: 150,
                    align: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('Button', {
                                props: {
                                    type: 'primary',
                                    size: 'small'
                                },
                                style: {
                                    marginRight: '5px'
                                },
                                on: {
                                    click: () => {
                                        this.formValidate = params.row;
                                        this.editConfirm.status = true;
                                    }
                                }
                            }, this.$t('edit')),
                            h('Poptip', {
                                props: {
                                    confirm: true,
                                    title: this.$t('deleteConfirm'),
                                    transfer: true
                                },
                                on: {
                                    'on-ok': () => {
                                        nodeModel.delete(params.row.devEUI).then(result => {
                                            this.init();
                                            this.$Message.success(this.$t('successOperation'));
                                        }).catch(err => console.log(err))
                                    }
                                }
                            }, [
                                h('Button', {
                                    style: {
                                        margin: '0 5px'
                                    },
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    }
                                }, this.$t('delete'))
                            ])
                        ]);
                    }
                }
            ],
            data: [],
            selectdata: [],
            initTable: [],
            counts: 0,
            pageSize: 25,
            offset: 0
        };
    }, 
    methods: {
        init () {
            nodeModel.lists({offset:this.offset, limit:this.pageSize}).then(result => {
                for (const i in result.result) {
                    result.result[i].time = util.getDateDiff(result.result[i].timestamp)
                }
                this.data = this.initTable = result.result;
                this.counts = parseInt(result.totalCount);
            }).catch(err => console.log(err))
            this.loading = false;
        },
        search (data, argumentObj) {
            let res = data;
            let dataClone = data;
            for (let argu in argumentObj) {
                if (argumentObj[argu].length > 0) {
                    res = dataClone.filter(d => {
                        return d[argu].indexOf(argumentObj[argu]) > -1;
                    });
                    dataClone = res;
                }
            }
            return res;
        },
        handleSearch () {
            this.data = this.initTable;
            this.data = this.search(this.data, {name: this.searchConName, devEUI: this.searchConEui});
        },
        importExcel (e) {
            let that = this;
            let f = e;
            let reader = new FileReader();
            let name = f.name;
            reader.onload = async function(e) {
                that.$Message.loading({
                    content: that.$t('importLoading'),
                    duration: 0
                });
                let data = e.target.result;
                let workbook;
                workbook = XLSX.read(data, {
                    type: 'binary'
                });
                let excelData = util.to_json(workbook);
                let list = excelData.node;
                for (const i in list) {
                    list[i].adrInterval = parseInt(list[i].adrInterval);
                    list[i].installationMargin = parseInt(list[i].installationMargin);
                    list[i].rx1DROffset = parseInt(list[i].rx1DROffset);
                    list[i].rx2DR = parseInt(list[i].rx2DR);
                    list[i].rxDelay = parseInt(list[i].rxDelay);
                    list[i].type = parseInt(list[i].type);
                    list[i].isClassC = list[i].isClassC == 1 ? true : false;
                    list[i].isABP = list[i].isABP == 1 ? true : false;
                    list[i].relaxFCnt = list[i].relaxFCnt == 1 ? true : false;
                    list[i].applicationID = list[i].applicationID ? list[i].applicationID : '0';
                    list[i].sensorID = [];
                }

                let info = {
                    ynum: 0,
                    nnum: 0,
                    list: []
                }
                for (const i in list) {
                    await nodeModel.add(list[i]).then(result => {
                        info.ynum++;
                        info.list.push({id:list[i].devEUI, stats:that.$t('success')});
                    }).catch(err => {
                        info.nnum++;
                        info.list.push({id:list[i].devEUI, stats:that.$t('error')});
                    })
                }
                that.init();
                that.$Message.destroy();
                that.$Message.info({
                    render: h => {
                        return h('span', [that.$t('importSuccess')+info.ynum+that.$t('importError')+info.nnum+that.$t('unit'),
                            h('a', {
                                on: {
                                    click: () => {
                                        that.importConfirm.status = true;
                                        that.importConfirm.data = info.list;
                                    }
                                }
                            },that.$t('viewDetails')),
                        ])
                    },
                    duration: 5,
                    closable: true
                });
            };
            reader.readAsBinaryString(f);
        },
        selectData (data) {
            this.selectdata = data;
        },
        exportExcel () {
            let d = this.selectdata;
            if(d.length == 0){
                this.$Message.error(this.$t('checkExport'));
                return false;
            }
            let data = [
                [
                    "name",
                    "devEUI",
                    "authCode",
                    "appEUI",
                    "appKey",
                    "applicationID",
                    "isClassC",
                    "relaxFCnt",
                    "isABP",
                    "adrInterval",
                    "installationMargin",
                    "description",
                    "latitude",
                    "longitude",
                    "rx1DROffset",
                    "rx2DR",
                    "rxDelay",
                    "rxWindow",
                    "type"
                ]
            ];
            for (let i in d) {
                data.push(
                    [
                        d[i].name,
                        d[i].devEUI,
                        'strings',
                        d[i].appEUI,
                        d[i].appKey,
                        '0',
                        0,
                        1,
                        1,
                        0,
                        0,
                        'strings',
                        d[i].latitude,
                        d[i].longitude,
                        d[i].rx1DROffset,
                        d[i].rx2DR,
                        d[i].rxDelay,
                        d[i].rxWindow,
                        0
                    ]
                );
            }
            const ws = XLSX.utils.aoa_to_sheet(data);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "node");
            
            const wbout = XLSX.write(wb, {type: "binary", bookType: "xlsx"})
            XLSX_SAVE.saveAs(new Blob([util.s2ab(wbout)], {type: "application/octet-stream"}), "node.xlsx");
        },
        nextPage (page) {
            this.offset = (page-1)*this.pageSize;
            this.init();
        },
        addConfirms () {
            this.addConfirm.status = true;
        },
        add (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.addConfirm.loading = false;
                    nodeModel.add(this.$refs[name].model).then(result => {
                        this.init();
                        this.$Message.success(this.$t('successOperation'));
                        this.addConfirm.status = false;
                        this.$refs[name].resetFields();
                    }).catch(err => {
                        console.log(err)
                        this.loadConfirm('addConfirm');
                    })
                }else{
                    this.$Message.error(this.$t('dataerror'));
                    this.loadConfirm('addConfirm');
                }
                
            })
        },
        edit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.editConfirm.loading = false;
                    nodeModel.edit(this.$refs[name].model).then(result => {
                        this.init();
                        this.$Message.success(this.$t('successOperation'));
                        this.editConfirm.status = false;
                    }).catch(err => {
                        console.log(err)
                        this.loadConfirm('editConfirm');
                    })
                }else{
                    this.$Message.error(this.$t('dataerror'));
                    this.loadConfirm('editConfirm');
                }
            })
        },
        async deleteData () {
            let data = this.selectdata;
            if(data.length == 0){
                this.$Message.error(this.$t('checkDelete'));
                return false;
            }
            this.$Message.loading({
                content: this.$t('deleteLoading'),
                duration: 0
            });
            for (const i in data) {
                await nodeModel.delete(data[i].devEUI);
            }
            this.$Message.destroy();
            this.init();
            this.$Message.success(this.$t('successOperation'));
        },
        loadConfirm (name) {
            this[name].loading = false;
            this.$nextTick(() => {
                this[name].loading = true;
            });
        }
    },
    mounted () {
        this.init();
    }
};
</script>
