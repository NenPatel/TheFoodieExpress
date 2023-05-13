import React, { useEffect, useState } from "react";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import { motion } from "framer-motion";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import Logo from "../img/images-bg.png";
import Avatar from "../img/avatar.png";
import Guest from "../img/images2.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider";
import { actionType } from "../context/reducer";
import { getDatabase, ref, onValue} from "firebase/database";
// import { getAuth } from "firebase/auth";

const Header = () => {
  const db = getDatabase();
  // const auth = getAuth()
  
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user, cartShow, cartItems }, dispatch] = useStateValue();
  // let data = [];
  const initialCall = () => {
    if(user!==null){
      // const userId = auth.currentUser.uid;
      const starCountRef11 = ref(db, 'items/' + user.uid+"/item");
      onValue(starCountRef11, (snapshot) => {
        console.log(snapshot.val());
        console.log("intital");
        localStorage.setItem("cartItems",JSON.stringify(snapshot.val()))
      return snapshot.val()?snapshot.val(): [];

      // console.log("hello2");
      // updateStarCount(postElement, data);
      // console.log(data.length);
    });
    }
  }
  const [data,setData] = useState(initialCall)
  
  // console.log(user);
  // console.log(data);
  const [isMenu, setIsMenu] = useState(false);

  useEffect(() => {
    if(user!==null){
    
    // const starCountRef11 = ref(db, 'items/' + user.uid+"/item");
    //   onValue(starCountRef11, (snapshot) => {
    //   setData(snapshot.val());
    //   console.log("Done");
    // })
    localStorage.setItem("cartItems",JSON.stringify(data))
  }
    }, [user])
  

  useEffect(() => {
    if(user!==null){
      const starCountRef = ref(db, 'items/' + user.uid+"/item");
      onValue(starCountRef, (snapshot) => {
      const data1 = snapshot.val();
      setData(data1)
      console.log("hello");
      // updateStarCount(postElement, data);
      // console.log(data.length);
    });
    }
  },[cartItems])
  
console.log(data);


  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    getAuth().signOut()

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };

  return (
    <header className="fixed z-50 w-screen p-2 px-4 md:p-2 md:px-12 bg-blue-300">
      {/* desktop & tablet */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-14 object-cover" alt="logo" />
          <p className="text-xl underline font-bold text-red-600 decoration-slice">The Foodie Express</p>
        </Link>

        <div className="flex items-center gap-8">
          <motion.ul
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            className="flex items-center gap-12 ">

            <Link to={"/"} ><li className="text-xl text-black hover:text-red-600 duration-100 transition-all ease-in-out cursor-pointer">
              Home
            </li></Link>
            {/* <Link to={"/menu"} ><li className="text-xl text-black hover:text-red-600 duration-100 transition-all ease-in-out cursor-pointer">
              Menu
            </li></Link> */}
            <Link to={"/aboutus"} ><li className="text-xl text-black hover:text-red-600 duration-100 transition-all ease-in-out cursor-pointer">
              About
            </li></Link>
            <Link to={"/contact"} ><li className="text-xl text-black hover:text-red-600 duration-100 transition-all ease-in-out cursor-pointer">
              Contact
            </li></Link>
            <Link to={"/service"} ><li className="text-xl text-black hover:text-red-600 duration-100 transition-all ease-in-out cursor-pointer">
              Service
            </li></Link>

          </motion.ul>

          <div
            className="relative flex items-center justify-center"
            onClick={showCart}
          >
            <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
            {data && user && data.length > 0 && (
              <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
                <p className="text-xs text-white font-semibold">
                  {data.length}
                </p>
              </div>
            )}
          </div>

          <div className="relative">
            <motion.img
              whileTap={{ scale: 0.6 }}
              src={user ? user.photoURL : Avatar}
              // src={user ? Avatar :  Guest }
              className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
              alt="userprofile"
              onClick={login}
            />
            {isMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
              >
                {user && user.email === "nenspatel2001@gmail.com" && (
                  <Link to={"/createItem"}>
                    <p
                      className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                      onClick={() => setIsMenu(false)}
                    >
                      New Item <MdAdd />
                    </p>
                  </Link>
                )}

                <p
                  className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base"
                  onClick={logout}
                >
                  Logout <MdLogout />
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* mobile */}
      <div className="flex items-center justify-between md:hidden w-full h-full ">
        <div
          className="relative flex items-center justify-center"
          onClick={showCart}
        >
          <MdShoppingBasket className="text-textColor text-2xl  cursor-pointer" />
          {cartItems && cartItems.length > 0 && (
            <div className=" absolute -top-2 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex items-center justify-center">
              <p className="text-xs text-white font-semibold">
                {cartItems.length}
              </p>
            </div>
          )}
        </div>

        <Link to={"/"} className="flex items-center gap-2">
          <img src={Logo} className="w-8 object-cover" alt="logo" />
          <p className="text-headingColor text-xl font-bold"> City</p>
        </Link>

        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.6 }}
            src={user ? user.photoURL : Avatar}
            className="w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl cursor-pointer rounded-full"
            alt="userprofile"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0"
            >
              {user && user.email === "nenspatel2001@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}

              <ul className="flex flex-col ">
                <Link to="/" ><li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Home
                </li></Link>
                <Link to="/contact"><li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Contact
                </li></Link>

                <Link to="/aboutus"><li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  About Us
                </li></Link>
                <Link to="/service"><li
                  className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2"
                  onClick={() => setIsMenu(false)}
                >
                  Service
                </li></Link>
              </ul>

              <p
                className="m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-gray-200 gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base"
                onClick={logout}
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
