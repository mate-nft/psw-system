import styles from '../../styles/Home.module.css'

const Header = ({accounts, setAccounts}) => {
    const isConnected = Boolean(accounts[0]);//Booleanは()の値をtrue or falseに変える

    async function connectAccount(){
        if(window.ethereum){ //Metamaskチェック
            const networkId = await window.ethereum.request({ method: 'net_version' });
            if (networkId !== '1') {
                // ここでユーザーにメッセージを表示する
                alert("イーサリアムネットワークに変更してください");
                return;
            }
            const accounts = await window.ethereum.request({ //ウォレットのアカウントへのアクセス。
                method:"eth_requestAccounts",
            })
            setAccounts(accounts);
        }else{
            alert("メタマスクのインストールが必要です");
        };
    }

    return (
        <div className={styles.header}>
            {isConnected ?(
                <p className={styles.connected}>{`${accounts[0].substring(0, 4)}...${accounts[0].substring(accounts[0].length - 4)}`}</p>
            ):(
                <button className={styles.connect} onClick={connectAccount}>ウォレット接続する</button>
            )}
        </div>
    );
}

export default Header;