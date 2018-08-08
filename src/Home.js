import React, { Component } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import {
    Toast,
} from 'native-base'
import axios from 'axios';


export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            data: [],
            currentPage: 0,
            totalPage: 10000,
        };

        this.showMessage = this.showMessage.bind(this);
        this.loadNextPage = this.loadNextPage.bind(this);
    }
    //untuk memanggil data dari api
    componentWillMount() {
        this.retrieveList(false)
    }

    retrieveList(isRefreshed) {
        axios.get('http://localhost:8000/negara/page/0').then((response) => {
            this.setState({ data: response.data.data, totalPage: response.data.totalpage, isLoading: false });
        })

        if (isRefreshed && this.setState({ isRefreshing: false }));
    }

    loadNextPage() {
        if (!this.state.isLoading && this.state.currentPage < this.state.totalPage) {
            let page = this.state.currentPage + 1;

            this.setState({
                currentPage: page,
            });

            axios.get('http://localhost:8000/negara/page/' + page)
                .then(res => {
                    // console.log(res)
                    if (res.data.data.length > 0) {
                        this.setState({
                            data: [...this.state.data, ...res.data.data],
                            isLoading: false
                        });
                    } 
                }).catch(err => {
                    console.log('next page', err); // eslint-disable-line
                });
        }
    }

    //membuat separator yg akan di panggil ke flatlist
    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    backgroundColor: "#CED0CE",
                }}
            />
        );
    };
    //fungsi memanggil nama_negara dari axios yg akan di tampilkan ke flatlist
    _renderItem = ({ item }) => (
        <TouchableOpacity key={item._id} style={{ height: 50, padding: 16, justifyContent: 'center' }} onPress={() => {
            this.props.navigation.navigate('Detail', { item, mode: 'Lihat', showMessage: this.showMessage })
        }}>
            <Text>{item.nama_negara}</Text>
        </TouchableOpacity>
    );

    _keyExtractor = (item, index) => item + index;

    showMessage(mode, msg, item) {
        Toast.show({
            text: msg,
            buttonText: 'Okay'
        })

        if (mode === 'Ubah') {
            tempArray = this.state.data;
            index = tempArray.findIndex((element) => {
                return item._id === element._id
            })
            tempArray[index] = item;
            this.setState({ data: tempArray });
        } else if (mode === 'Buat') {
            tempArray = this.state.data;
            tempArray.push(item);
            this.setState({ data: tempArray });
        } else if (mode === 'Hapus') {
            // tempArray = this.state.data;
            // index = tempArray.findIndex((element) => {
            //     return item._id === element._id
            // })
            this.setState({ data: this.state.data.filter(e => e._id !== item._id) });
        }
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ paddingTop: 20, height: 64, flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Home</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                        <TouchableOpacity style={{ padding: 10 }} onPress={() => {
                            this.props.navigation.navigate('Detail', { mode: 'Buat', showMessage: this.showMessage })
                        }}>
                            <Text>Tambah</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <FlatList
                    style={{}}
                    data={this.state.data}
                    extraData={this.state}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                    ItemSeparatorComponent={this.renderSeparator}
                    onEndReachedThreshold={5}
                    onEndReached={this.loadNextPage}
                    removeClippedSubviews={false}
                />
            </View>
        );
    }
}