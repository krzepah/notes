
import style from './style';
import { DropReplace } from 'preact-dropdown';

const ThreeButtons = ({style}) => <svg x="0px" y="0px" width="30px" height="30px" viewBox="0 0 408 408" style={style}>
  <path d="M204,102c28.05,0,51-22.95,51-51S232.05,0,204,0s-51,22.95-51,51S175.95,102,204,102z M204,153c-28.05,0-51,22.95-51,51    s22.95,51,51,51s51-22.95,51-51S232.05,153,204,153z M204,306c-28.05,0-51,22.95-51,51s22.95,51,51,51s51-22.95,51-51    S232.05,306,204,306z"/>
</svg>

const Button = (args) => <button
  style="padding:10px; background:#394"
  {...args}
>
  <ThreeButtons style="pointer-events: none;" />
</button>

const Menu = () => <DropReplace
  Link={Button}
  linkstyle=""
>
  <div class={style.buttons}>
    <a>Delete</a>
    <a>Reply</a>
  </div>
</DropReplace>

export default Menu;
