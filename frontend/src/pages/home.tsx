import React from 'react';
import { Button, Typography } from '@mui/material';
import UserService from '../services/UserService';
import User, { BlankUser } from '../types/User';
import AuthService from '../services/AuthService';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { clearCurrentUser } from '../store/user';

function logout(setUser: React.Dispatch<React.SetStateAction<User>>, clearCurrentUser: () => void) {
  AuthService.signOut();
  setUser(BlankUser);
  clearCurrentUser();
}

export default function HomePage() {
  const [user, setUser] = React.useState(BlankUser);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const fetchUser = async () => {
      const user = await UserService.getUser(1);
      setUser(user);
    };
    fetchUser();
  }, []);

  const currentUser = useAppSelector((state) => state.user.currentUser);
  console.log(currentUser);

  return (
    <div>
      <Typography variant="h1">HOME PAGE</Typography>
      <Button
        onClick={() => {
          logout(setUser, () => {
            dispatch(clearCurrentUser());
          });
        }}>
        Log Out
      </Button>
      <p>{user.username}</p>
    </div>
  );
}

// class HomePage extends React.Component<Record<string, never>, HomePageState> {
//   state: HomePageState = {
//     user: BlankUser
//   };

//   constructor(props: Record<string, never>) {
//     super(props);
//   }

//   componentDidMount() {
//     UserService.getUser(1).then((user) => {
//       this.setState({ user: user });
//     });
//   }

//   render() {
//     return (
//       <div>
//         <Typography variant="h1">HOME PAGE</Typography>
//         <Button>Hello World</Button>
//         <Typography variant="h2">Hello, {this.state.user.firstName}.</Typography>
//         <Button onClick={() => logout()}>Logout Button</Button>
//       </div>
//     );
//   }
// }

// export default HomePage;
