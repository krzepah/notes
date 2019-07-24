
import { replace } from 'ramda';

const now = () => new Date().toLocaleDateString()
+ ' '
+  new Date().toTimeString().slice(0, 8)

const today = () => String(new Date().getDate()) + 
    "/" + String(new Date().getMonth() + 1) +
    "/" + String(new Date().getFullYear())

export {
	today,
    now
}
