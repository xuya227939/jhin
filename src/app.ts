import * as React from 'react';
import 'taro-ui/dist/style/index.scss';
import './app.less';

class App extends React.Component {
    componentDidMount() {}

    componentDidShow() {}

    componentDidHide() {}

    componentDidCatchError() {}

    // this.props.children 是将要会渲染的页面
    render() {
        // @ts-ignore
        return this.props.children;
    }
}

export default App;
