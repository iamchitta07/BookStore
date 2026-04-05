import { useEffect, useState } from "react";
import api from "../../services/axios";
import InputField from "./InputField";
import type {UserData} from "../../types";

const UserPage = () => {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userName, setUserName] = useState<[string, string]>(["", ""]);
  const [user, setUser] = useState<UserData>({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    address: "",
    role: "",
    username: "",
  });

  const [initialUser, setInitialUser] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get("/users/me");
        setUser(response.data);
        setInitialUser(response.data);
        setUserName([response.data.first_name, response.data.last_name]);
      } catch (error) {
        console.error("Failed to fetch user data", error);
        alert("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const updateData = {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        address: user.address,
      };

      await api.put("/users/me", updateData);
      setInitialUser(user);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Failed to update user", error);
      alert("Failed to save changes.");
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    if (initialUser) {
      setUser(initialUser);
      alert("Changes discarded");
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#FFF3B0]">
        <h2 className="text-3xl font-black italic">LOADING...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="max-w-7xl mx-auto px-4">
          {/* Header Section */}
          <div className="mb-12 text-center pb-2 gap-2 flex flex-col items-center">
            <h1 className="text-5xl font-black relative inline-block">
              Login and Security
            </h1>
            <h2 className="text-3xl font-black mt-2 tracking-wide">
              Hello! {userName[0]} {userName[1]}
            </h2>
          </div>

          {/* Form Section */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <InputField
              label="First Name"
              name="first_name"
              value={user.first_name}
              onChange={handleChange}
              color="#FFD580"
            />
            <InputField
              label="Last Name"
              name="last_name"
              value={user.last_name}
              onChange={handleChange}
              color="#FFD580"
            />
            <InputField
              label="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
              color="#FFD580"
              type="email"
            />
            <InputField
              label="Phone Number"
              name="phone_number"
              value={user.phone_number || ""}
              onChange={handleChange}
              color="#FFD580"
            />
            <div className="col-span-2">
              <InputField
                label="Address"
                name="address"
                value={user.address || ""}
                onChange={handleChange}
                color="#FFD580"
              />
            </div>
            <InputField
              label="Username"
              name="username"
              value={user.username}
              disabled={true}
              color="#e5e7eb"
            />
            <InputField
              label="Role"
              name="role"
              value={user.role}
              disabled={true}
              color="#e5e7eb"
            />
          </div>

          {/* Buttons Section */}
          <div className="flex flex-col gap-8 mt-10">
            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full py-4 text-2xl font-black bg-col-two text-black border-3 border-black shadow-[6px_6px_0_0_#FF85A2] hover:translate-1.5 hover:shadow-none transition-all disabled:opacity-50 tracking-wider"
            >
              {saving ? "SAVING..." : "SAVE"}
            </button>
            <button
              onClick={handleDiscard}
              className="w-full py-4 text-2xl font-black bg-delete-btn text-white border-3 border-black shadow-[6px_6px_0_0_#FF6B6B] hover:translate-1.5 hover:shadow-none transition-all tracking-wider"
            >
              DISCARD
            </button>
          </div>
        </div>
    </div>
  );
};



export default UserPage;
