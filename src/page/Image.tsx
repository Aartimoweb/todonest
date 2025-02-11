import { useState } from "react";

interface ProfileProps {
  imageUrl?: string;
  username: string;
  lastname: string;
}

const Profile: React.FC<ProfileProps> = ({ imageUrl, username, lastname }) => {
  const [imageError, setImageError] = useState(false);

  const getInitials = () => {
    return `${username.charAt(0).toUpperCase()}${lastname.charAt(0).toUpperCase()}`;
  };

  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ccc",
        fontSize: "18px",
        fontWeight: "bold",
        color: "black",
      }}
    >
      {imageUrl && !imageError ? (
        <img
          src={imageUrl}
          alt="Profile"
          onError={() => setImageError(true)}
          style={{ width: "100%", height: "100%", borderRadius: "50%" }}
        />
      ) : (
        <span>{getInitials()}</span>
      )}
    </div>
  );
};

export default Profile;
