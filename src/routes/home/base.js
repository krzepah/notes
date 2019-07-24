import { map } from 'ramda';
import style from './style';

import { newRecord } from './actions';

import { Record } from 'Components/element';

const HomeBase = ({records, create}) => <div class={style.home}>
 <div class={style.nav} id="headnav">
    <a href="/">Your records</a>
    <a onClick={() => newRecord(create)}>
      + New record
    </a>
  </div>
  { map(
    (id) => <a href={"/record/" + id}>
      <Record id={id}/>
    </a>,
    records
  )}
</div>

export default HomeBase;
