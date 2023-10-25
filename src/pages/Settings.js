import { useState } from "react";

import styles from "../styles/setting.module.css";
import { useAuth } from "../hooks";
import { useToasts } from "react-toast-notifications";

const Settings = () => {
  const auth = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(auth.user?.name ? auth.user.name : "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [savingForm, setSavingForm] = useState(false);
  const {addToast} = useToasts();
  const clearForm = () =>{
    setPassword('');
    setConfirmPassword('');
    setPassword('');
  };
  const updateProfile = async() => {
    setSavingForm(true);
    let error = false;
    if(!name || !password || !confirmPassword){
      addToast('Please fill all the fields',{
        appearance: 'error'
      })
      error = true;
    }
    if(password !== confirmPassword){
      addToast('Password & Confirm Password does not match!',{
        appearance: 'error'
      });
      error = true;
    }

    if(error){
      return setSavingForm(false);
    }

    const response = await auth.updateUser(auth.user._id,name,password,confirmPassword);
    if(response.success){
      setEditMode(false);
      setSavingForm(false);
      clearForm();
      return addToast('User updated successfully',{
        appearance: 'success'
    });
    }else{
      setSavingForm('false');
      addToast(response.message,{
        appearance: 'error'
      })
    }
  };

  return (
    <div className={styles.settings}>
      <div className={styles.imgContainer}>
        <img
          src="https://cdn-icons-png.flaticon.com/128/1090/1090793.png"
          alt=""
        />
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Email</div>
        <div className={styles.fieldValue}>{auth.user?.email}</div>
      </div>

      <div className={styles.field}>
        <div className={styles.fieldLabel}>Name</div>
        {editMode ? (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        ) : (
          <div className={styles.fieldValue}>{auth.user?.name}</div>
        )}
      </div>

      {editMode && (
        <>
          <div className={styles.field}>
            <div className={styles.fieldLabel}>Password</div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className={styles.field}>
            <div className={styles.fieldLabel}>Confirm Password</div>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
        </>
      )}

      <div className={styles.btnGrp}>
        {editMode ? (
          <>
            <button
              className={`button ${styles.saveBtn}`}
              onClick={updateProfile}
            >
              {savingForm ? "Saving profile..." : "Save profile"}
            </button>
            <button
              className={`button ${styles.editBtn}`}
              onClick={() => setEditMode(false)}
            >
              Go back
            </button>
          </>
        ) : (
          <button
            className={`button ${styles.editBtn}`}
            onClick={() => setEditMode(true)}
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};
export default Settings;
