import styles from './index.less';
import { Link } from 'umi'

export default function IndexPage() {
  return (
    <div>
      <h1 className={styles.title}>React hooks入门示例</h1>
      <div>
        <Link to={"/user-list"}>user list 表格</Link>
      </div>
      <div>
        <Link to={"/user-list-select"}>user list 选择器</Link>
      </div>
      <div>
        <Link to={"/user-group-list-select"}>user group list 选择器</Link>
      </div>
    </div>
  );
}
