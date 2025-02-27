import Uls from '@/utils/ULs-component'
import SocialMedia from '@/utils/Social-component'
import owner from '@/data/owner'
import { links } from '@/data/layout/footer'

export default function Footer() {
    const hoverEffectFooterLists = 'relative after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-slate-400 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300'
    return(
    <footer className='px-GlobalXPad md:px-MdXPad lg:px-LgXPad py-14'>
        {/* navigation */}
        <Uls listItemStyle={`text-TextSec mt-2 w-fit ${hoverEffectFooterLists}`} style={'flex justify-between md:justify-around flex-wrap gap-7 mb-11'} array={links}/>

        {/* social media */}
        <SocialMedia className={'flex flex-row justify-center mb-11 text-2xl'}/>

        {/* copyright */}
        <Copyright />
    </footer>
    )
}


//supcom ################### Copyright sec ################### //
function Copyright(){
    return(
        <div className="flex justify-center text-sm py-3">
            <span>&copy; {new Date().getFullYear()} {owner.fullName} </span>
        </div>
    )
}
