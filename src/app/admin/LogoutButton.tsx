"use client";
export default function LogoutButton() {
  return (
    <button
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        location.href = "/admin/login";
      }}
      className="rounded-full border border-[#DCE4EF] bg-white px-5 py-2.5 font-bold"
    >
      Log out
    </button>
  );
}
