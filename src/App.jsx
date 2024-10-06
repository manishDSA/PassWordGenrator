import {useState,useCallback,useEffect,useRef} from 'react'

function App() {
  const[length,setlength]= useState(8);

  const[NumberAllowed,setNumberAllowed]= useState(false)
  const[CharacterAllowed,setCharacterAllowed]= useState(false)
  const[Password,setpassword]= useState("")
 //useRef hook
 const passwordRef = useRef(null);
  const PasswordGenrator = useCallback(
    () => {
      let pass=""
      let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
      if (NumberAllowed) str+="0123456799"
      if (CharacterAllowed)  str+="!@#$%^&-+=[]{}~`"
      for (let i = 1; i < length; i++) {
         let char= Math.floor(Math.random() * str.length+1);
         pass+= str.charAt(char)
      }
      setpassword(pass)
    },
    [length,NumberAllowed,CharacterAllowed,setpassword],
  );
 const CopyPasswordToClipBoard = useCallback(()=>{
 //use of passwordRef
 //current is option object which i select
 passwordRef.current?.select();

 // in this we give rang to select he password 
 passwordRef.current?.setSelectionRange(0,10)
 
 
 window.navigator.clipboard.writeText(passwordRef.current.value)
 const tag= document.getElementById("button")
 tag.style.background="green"

},[Password])
 
 
 
 
 useEffect(() => {
   PasswordGenrator()
 }, [length,NumberAllowed,CharacterAllowed,setpassword]);
  

  return (
    <>
  <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 text-orange-500 bg-gray-800 mt-10'>
    <h1 className='text-white text-center'>Password Genrator</h1>
    <div className=' flex shadow rounded-lg overflow-hidden mb-4'>
       <input type="text" 
       value={Password}
       className='outline-none w-full py-1 px-3'
       placeholder='password'
       readOnly
     //here we give the refrence of password
     ref={passwordRef}
       />
       <button id='button' onClick={CopyPasswordToClipBoard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
    </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
         <input type="range" 
         min={6}
         max={100}
         value={length}
         className='cursor-pointer'
         onChange={(e)=>setlength(e.target.value)}
         />
         <label  >Length:{length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={NumberAllowed}
          id='numberInput'
          onChange={()=>{ setNumberAllowed((prev)=>!prev)}}
          />
          <label htmlFor="numberInput">Number</label>
        </div>
        <div className=' flex items-center gap-x-1'>
        <input type="checkbox" 
          defaultChecked={CharacterAllowed}
          id='characterInput'
          onChange={()=>{ setCharacterAllowed((prev)=>!prev)}}
          />
          <label htmlFor="characterInput">Character</label>
        </div>
      </div>

  </div>
    </>
  )
}

export default App
