import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { taskService } from "../../api/admin";
import { Button } from "@/components/ui/button";
import { Plus, Copy, Trash2 } from "lucide-react";
import UserForm from "../task/UserForm";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const AllUser = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newUserDetails, setNewUserDetails] = useState(null);
    const [showCredentials, setShowCredentials] = useState(false);
    const { role } = useAuth();
    const [users, setUsers] = useState([]);

    const getAlladminUser = async () => {
        const res = await taskService.allUser();
        if (res.success) {
            setUsers(res.users);
        }
    };

    useEffect(() => {
        getAlladminUser();
    }, []);

    const handleDeleteUser = async (id) => {
        if (!role === 'admin') return;
        if (!id) return;
        try {
            const res = await taskService.deleteUser(id);
            if (res.success) {
                const newUsers = users.filter((user) => user.id != id);
                setUsers(newUsers);
                toast.success("User deleted successfully");
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const handleCreateUser = async (formData) => {
        if (!role === 'admin') return;
        try {
            const res = await taskService.createUser({
                username: formData.username,
                email: formData.email,
            });

            if (res.success) {
                toast.success("User created successfully");
                setNewUserDetails(res.user);
                const newUsers = [...users, {
                    password: res.user.password,
                    username: res.user.username,
                    email: res.user.email,
                    id: res.user.id,
                    createdAt: res.user.createdAt
                }];
                console.log(newUserDetails,res.user)
                setUsers(newUsers);
                setShowCredentials(true);
            } else {
                toast.error(res.msg || "Failed to create user");
            }
        } catch (error) {
            toast.error("Cannot create user internal server error");
            console.error(error);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard
            .writeText(text)
            .then(() => toast.success("Copied to clipboard"))
            .catch(() => toast.error("Failed to copy"));
    };

    const closeCredentialsDialog = () => {
        setNewUserDetails(null);
        setShowCredentials(false);
        setIsDialogOpen(false);
    };

    const userLength = users.length;

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">All Users</h1>
                    <p className="text-gray-600 mt-1">Total users: {userLength}</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-600 hover:bg-blue-700">
                            <Plus className="h-4 w-4 mr-2" />
                            Create User
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        {showCredentials && newUserDetails ? (
                            <>
                                <DialogHeader>
                                    <DialogTitle>User Created Successfully</DialogTitle>
                                </DialogHeader>
                                <div className="mt-4 space-y-4">
                                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                                        <h3 className="font-medium text-lg mb-2 text-green-800">
                                            User Credentials
                                        </h3>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">Username:</span>
                                                <div className="flex items-center space-x-2">
                                                    <span>{newUserDetails.username}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => copyToClipboard(newUserDetails.username)}
                                                    >
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">Email:</span>
                                                <div className="flex items-center space-x-2">
                                                    <span>{newUserDetails.email || "Not provided"}</span>
                                                    {newUserDetails.email && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => copyToClipboard(newUserDetails.email)}
                                                        >
                                                            <Copy className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="font-medium">Password:</span>
                                                <div className="flex items-center space-x-2">
                                                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                                                        {newUserDetails.password}
                                                    </span>
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => copyToClipboard(newUserDetails.password)}
                                                    >
                                                        <Copy className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-sm text-red-600 mt-4">
                                            Important: This is the only time you'll see this password.
                                            Make sure to save it or share it with the user now.
                                        </p>
                                    </div>
                                    <Button className="w-full" onClick={closeCredentialsDialog}>
                                        Close
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <DialogHeader>
                                    <DialogTitle>Create New User</DialogTitle>
                                </DialogHeader>
                                <UserForm onSubmit={handleCreateUser} />
                            </>
                        )}
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Username</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Password</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                            <tr key={user.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{user.username}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">{user.password}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm text-gray-500">
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-6 py-4 flex whitespace-nowrap text-right text-sm font-medium">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:text-red-900"
                                        onClick={() => handleDeleteUser(user.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUser;
