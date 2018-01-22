<style lang="less">
    @import '../../styles/common.less';
    @import '../tables/components/table.less';
    @import './gateway.less';
</style>

<template>
    <div>
        <Row :gutter="10">
            <Col span="24">
                <Card>
                    <p slot="title">
                        {{ $t('gateway') }}
                    </p>
                    <Row>
                        <Input v-model="searchConName" @on-change="handleSearch" icon="search" placeholder="name..." style="width: 200px" />
                        <Input v-model="searchConEui" @on-change="handleSearch" icon="search" placeholder="gatewayEUI..." style="width: 200px" />
                        <Button type="error" @click="deleteData" icon="android-delete" style="float:right">{{ $t('deleteData') }}</Button>
                        <Button type="success" @click="addConfirms" icon="android-add" style="float:right;margin-right:5px">{{ $t('addGateway') }}</Button>
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
                <FormItem label="name" prop="name">
                    <Input v-model="formValidate.name" placeholder="name"></Input>
                </FormItem>
                <FormItem label="gatewayEUI" prop="gatewayEUI">
                    <Input v-model="formValidate.gatewayEUI" placeholder="gatewayEUI"></Input>
                </FormItem>
            </Form>
        </Modal>

        <Modal width="500" v-model="addConfirm.status" :loading="addConfirm.loading" @on-ok="add('formValidate1')" :title="$t('add')">
            <Form ref="formValidate1" :model="formValidate1" :rules="ruleValidate" :label-width="100">
                <FormItem label="name" prop="name">
                    <Input v-model="formValidate1.name" placeholder="name"></Input>
                </FormItem>
                <FormItem label="gatewayEUI" prop="gatewayEUI">
                    <Input v-model="formValidate1.gatewayEUI" placeholder="gatewayEUI"></Input>
                </FormItem>
                <FormItem label="gatewaySeq" prop="gatewaySeq">
                    <Input v-model="formValidate1.gatewaySeq" placeholder="gatewaySeq"></Input>
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
import gatewayModel from '@/api/gateway.js';
export default {
    name: 'searchable-table',
    data () {
        return {
            importConfirm: {
                status: false,
                columns: [
                    {
                        key: 'id',
                        title: 'gatewayEUI'
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
                gatewayEUI: '',
                gatewaySeq: ''
            },
            ruleValidate: {
                name: [
                    { required: true, message: this.$t('fillname'), trigger: 'blur' },
                    { type: 'string', max: 20, message: this.$t('dataerror'), trigger: 'blur' }
                ],
                gatewayEUI: [
                    { required: true, message: this.$t('fillgatewayEUI'), trigger: 'blur' },
                    { type: 'string', len: 16, message: this.$t('dataerror'), trigger: 'blur' }
                ],
                gatewaySeq: [
                    { required: true, message: this.$t('fillgatewaySeq'), trigger: 'blur' },
                    { type: 'string', len: 32, message: this.$t('dataerror'), trigger: 'blur' }
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
                    key: 'gatewayEUI',
                    title: 'gatewayEUI'
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
                                        gatewayModel.delete(params.row.gatewayEUI).then(result => {
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
            gatewayModel.lists({offset:this.offset, limit:this.pageSize}).then(result => {
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
            this.data = this.search(this.data, {name: this.searchConName, gatewayEUI: this.searchConEui});
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
                excelData = excelData.gateway;

                let info = {
                    ynum: 0,
                    nnum: 0,
                    list: []
                }
                for (const i in excelData) {
                    await gatewayModel.add(excelData[i]).then(result => {
                        info.ynum++;
                        info.list.push({id:excelData[i].gatewayEUI, stats:that.$t('success')});
                    }).catch(err => {
                        info.nnum++;
                        info.list.push({id:excelData[i].gatewayEUI, stats:that.$t('error')});
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
            let exportData = [["gatewayEUI", "gatewaySeq", "name"]];
            for (let i in d) {
                exportData.push([d[i].gatewayEUI, d[i].gatewaySeq, d[i].name]);
            }
            const ws = XLSX.utils.aoa_to_sheet(exportData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "gateway");

            const wbout = XLSX.write(wb, {type: "binary", bookType: "xlsx"})
            XLSX_SAVE.saveAs(new Blob([util.s2ab(wbout)], {type: "application/octet-stream"}), "gateway.xlsx");
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
                    gatewayModel.add(this.$refs[name].model).then(result => {
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
                    gatewayModel.edit(this.$refs[name].model).then(result => {
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
                await gatewayModel.delete(data[i].gatewayEUI);
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
