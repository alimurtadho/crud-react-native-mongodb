import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Toast } from 'native-base';
import axios from 'axios'
import Modal from "react-native-modal";

class DetailScreen extends Component {
    constructor(props) {
        super(props);
        console.log(props.navigation.state.params.item)
        if (props.navigation.state.params.mode === 'Lihat') {
            this.state = {
                field_nama_benua: props.navigation.state.params.item.nama_benua,
                // field_populasi: "" + props.navigation.state.params.item.populasi,
                init_nama_benua: props.navigation.state.params.item.nama_benua,
                // init_populasi: "" + props.navigation.state.params.item.populasi,
                mode: 'Lihat',
            }
        } else if (props.navigation.state.params.mode === 'Buat') {
            this.state = {
                field_nama_benua: '',
                // field_populasi: '',
                init_nama_benua: '',
                // init_populasi: '',
                mode: 'Buat',
            }
        }
        this.tampilkanTombol = this.tampilkanTombol.bind(this);
        this.buatBaru = this.buatBaru.bind(this);
        this.ubahData = this.ubahData.bind(this);
        this.hapusData = this.hapusData.bind(this);
    }

    buatBaru() {
        _self = this;
        if (this.state.field_nama_benua === '' || this.state.field_populasi === '') {
            Toast.show({
                text: 'Error!',
                buttonText: 'Okay'
            })
        } else {
            axios.post('http://localhost:8000/benua/tambah', {
                nama_benua: this.state.field_nama_benua,
                // populasi: this.state.field_populasi,
            }).then((response) => {
                if (response.data.status_code === -1) {
                    Toast.show({
                        text: response.data.msg,
                        buttonText: 'Okay'
                    })
                } else {
                    _self.props.navigation.state.params.showMessage('Buat', response.data.msg, {
                        _id: response.data._id,
                        nama_benua: response.data.data.nama_benua,
                        // populasi: response.data.data.populasi
                    });
                    _self.props.navigation.goBack();
                }
            });
        }
    }

    ubahData() {
        _self = this;
        if (this.state.field_nama_negara === '' || this.state.field_populasi === '') {
            Toast.show({
                text: 'Error!',
                buttonText: 'Okay'
            })
        } else {
            axios.post('http://localhost:8000/benua/ubah', {
                _id: this.props.navigation.state.params.item._id,
                nama_benua: this.state.field_nama_benua,
                // populasi: this.state.field_populasi,
            }).then((response) => {
                if (response.data.status_code === -1) {
                    Toast.show({
                        text: response.data.msg,
                        buttonText: 'Okay'
                    })
                } else {
                    _self.props.navigation.state.params.showMessage('Ubah', response.data.msg, {
                        _id: _self.props.navigation.state.params.item._id,
                        nama_benua: _self.state.field_nama_benua,
                        // populasi: _self.state.field_populasi
                    });
                    _self.props.navigation.goBack();
                }
            });
        }
    }

    hapusData() {
        _self = this;
        if (this.state.field_nama_benua === '' ) {
            Toast.show({
                text: 'Error!',
                buttonText: 'Okay'
            })
        } else {
            axios.post('http://localhost:8000/benua/hapus', {
                _id: this.props.navigation.state.params.item._id,
            }).then((response) => {
                _self.setState({ isModalVisible: false });
                if (response.data.status_code === -1) {
                    Toast.show({
                        text: response.data.msg,
                        buttonText: 'Okay'
                    })
                } else {
                    _self.props.navigation.state.params.showMessage('Hapus', response.data.msg, {
                        _id: _self.props.navigation.state.params.item._id,
                    });
                    _self.props.navigation.goBack();
                }
            });
        }
    }

    tampilkanTombol() {
        if (this.state.mode === 'Lihat') {
            return (
                <View style={{ padding: 16 }}>
                    <TouchableOpacity style={{ height: 50, backgroundColor: 'green', marginBottom: 8, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                        this.setState({ mode: 'Ubah' })
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Ubah</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 50, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                        this.setState({ isModalVisible: true })
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Hapus</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (this.state.mode === 'Buat') {
            return (
                <View style={{ padding: 16 }}>
                    <TouchableOpacity style={{ height: 50, backgroundColor: 'green', marginBottom: 8, justifyContent: 'center', alignItems: 'center' }} onPress={this.buatBaru}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Simpan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 50, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                        this.setState({ field_nama_benua: this.state.init_nama_benua })
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Reset</Text>
                    </TouchableOpacity>
                </View>
            )
        } else if (this.state.mode === 'Ubah') {
            return (
                <View style={{ padding: 16 }}>
                    <TouchableOpacity style={{ height: 50, backgroundColor: 'green', marginBottom: 8, justifyContent: 'center', alignItems: 'center' }} onPress={this.ubahData}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Simpan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 50, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', marginBottom: 8 }} onPress={() => {
                        this.setState({ field_nama_benua: this.state.init_nama_benua })
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Reset</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ height: 50, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                        this.setState({ mode: 'Lihat' })
                    }}>
                        <Text style={{ color: 'white', fontWeight: 'bold' }}>Batal</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ paddingTop: 20, height: 64, flexDirection: 'row' }}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start' }}>
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => {
                            this.props.navigation.goBack()
                        }}>
                            <Text>Kembali</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{this.state.mode} Detail</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Form>
                        <Item>
                            <Input
                                placeholder="Nama Benua"
                                onChangeText={(text) => this.setState({ field_nama_benua: text })}
                                value={this.state.field_nama_benua}
                                editable={this.state.mode !== 'Lihat'}
                            />
                        </Item>
                        {/* <Item last>
                            <Input
                                onChangeText={(text) => this.setState({ field_populasi: text })}
                                value={this.state.field_populasi}
                                keyboardType={'numeric'}
                                placeholder="Populasi"
                                editable={this.state.mode !== 'Lihat'}
                            />
                        </Item> */}
                    </Form>
                    {
                        this.tampilkanTombol()
                    }
                </View>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={styles.modalContent}>
                        <Text style={{ marginBottom: 16 }}>Apakah anda yakin?</Text>
                        <TouchableOpacity onPress={this.hapusData}>
                            <View style={styles.button}>
                                <Text>Ya</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            this.setState({ isModalVisible: false })
                        }}>
                            <View style={styles.button}>
                                <Text>Batal</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    button: {
        backgroundColor: "lightblue",
        padding: 12,
        margin: 8,
        width: 150,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    modalContent: {
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    bottomModal: {
        justifyContent: "flex-end",
        margin: 0
    },
    scrollableModal: {
        height: 300
    },
    scrollableModalContent1: {
        height: 200,
        backgroundColor: "orange",
        alignItems: "center",
        justifyContent: "center"
    },
    scrollableModalContent2: {
        height: 200,
        backgroundColor: "lightgreen",
        alignItems: "center",
        justifyContent: "center"
    }
});

export default DetailScreen;