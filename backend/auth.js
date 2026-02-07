const admin = require("firebase-admin");

function assertSingleAdmin(context, allowedUid) {
  if (!context?.auth?.uid) {
    throw new Error("UNAUTHENTICATED");
  }
  if (allowedUid && context.auth.uid !== allowedUid) {
    throw new Error("PERMISSION_DENIED");
  }
}

async function disableOtherAdmins(allowedUid) {
  if (!allowedUid) return;
  const auth = admin.auth();
  const listed = await auth.listUsers(1000);
  await Promise.all(
    listed.users
      .filter((u) => u.uid !== allowedUid && !u.disabled)
      .map((u) => auth.updateUser(u.uid, { disabled: true }))
  );
}

module.exports = {
  assertSingleAdmin,
  disableOtherAdmins
};
