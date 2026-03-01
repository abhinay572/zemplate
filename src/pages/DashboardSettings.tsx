import { Navbar } from "@/components/layout/Navbar";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Save } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { SEO } from "@/components/seo/SEO";
import { useAuth } from "@/contexts/AuthContext";
import { updateUserProfile } from "@/lib/firestore/users";
import { uploadAvatar } from "@/lib/storage";

export function DashboardSettings() {
  const { user, profile, refreshProfile } = useAuth();
  const fileRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState(profile?.name || "");
  const [bio, setBio] = useState(profile?.bio || "");
  const [saving, setSaving] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  // Sync form state when profile loads (e.g., after signup/login)
  useEffect(() => {
    if (profile) {
      setName((prev) => prev || profile.name || "");
      setBio((prev) => prev || profile.bio || "");
    }
  }, [profile]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      const reader = new FileReader();
      reader.onload = () => setAvatarPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      let avatarUrl = profile?.avatar || "";
      if (avatarFile) {
        avatarUrl = await uploadAvatar(avatarFile, user.uid);
      }
      await updateUserProfile(user.uid, { name, bio, avatar: avatarUrl });
      await refreshProfile();
    } catch (err) {
      console.error("Failed to save profile:", err);
    } finally {
      setSaving(false);
    }
  };

  const displayAvatar = avatarPreview || profile?.avatar;

  return (
    <div className="min-h-screen bg-background flex flex-col pt-16">
      <SEO
        title="Profile Settings | Zemplate.ai"
        description="Manage your profile settings, notification preferences, and connected accounts."
      />
      <Navbar />
      <DashboardLayout>
        <div className="max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-display font-bold text-foreground mb-2">Profile Settings</h1>
            <p className="text-foreground-muted">Manage your account details and preferences.</p>
          </div>

          <div className="bg-surface border border-white/10 rounded-3xl p-6 md:p-8 space-y-8">
            {/* Profile Picture */}
            <div className="flex items-center gap-6">
              {displayAvatar ? (
                <img src={displayAvatar} alt="User" className="w-24 h-24 rounded-full border-2 border-primary/50 object-cover" referrerPolicy="no-referrer" />
              ) : (
                <div className="w-24 h-24 rounded-full border-2 border-primary/50 bg-primary/20 flex items-center justify-center text-white font-bold text-3xl">
                  {profile?.name?.charAt(0) || "U"}
                </div>
              )}
              <div>
                <button onClick={() => fileRef.current?.click()} className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors mb-2">
                  Change Avatar
                </button>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
                <p className="text-white/50 text-sm">JPG, GIF or PNG. Max size of 800K</p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Email Address</label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white/50 focus:outline-none cursor-not-allowed"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-medium text-white/80">Bio</label>
                <textarea
                  rows={4}
                  placeholder="Tell us a little about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors resize-none"
                ></textarea>
              </div>
            </div>

            {/* Connected Accounts */}
            <div className="pt-6 border-t border-white/10">
              <h3 className="text-lg font-medium text-white mb-4">Connected Accounts</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-background border border-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center">
                      <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Google</p>
                      <p className="text-white/50 text-sm">{user?.providerData?.[0]?.providerId === "google.com" ? "Connected" : "Not connected"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-6 border-t border-white/10 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </div>
  );
}
