import './App.css'
import axios from 'axios'
import { Route, Routes } from 'react-router-dom'
import { useStateContext } from './contexts/ContextProvider'

import { Layout, AdminLayout } from '.'
import {
  IndexPage,
  RegisterPage,
  LoginPage,
  TrainingsPage,
  TrainingPage,
  ComplaintPage,
  ContactPage,
  YellowCardPage,
  AccountPage,
  AccountTrainingPage,
  AccountYellowCardPage
} from './pages'
import {
  Dashboard,
  TrainingsFormPage,
  TrainingsDashboard,
  TrainingDashboard,
  TrainerDashboard,
  TrainersDashboard,
  TrainersFormPage,
  ParticipantsDashboard,
  AdminsDashboard,
  ComplaintsDashboard,
  YellowCardsDashboard
} from './pages/dashboard'
import { Loader } from './components'
import { ToastContainer } from 'react-toastify'

axios.defaults.baseURL = 'http://localhost:8082'
axios.defaults.withCredentials = true

function App() {
  const { readyState } = useStateContext()

  return !readyState ? (
    <Loader />
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/training" element={<TrainingsPage />} />
          <Route path="/training/:trainingId" element={<TrainingPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/yellowcard" element={<YellowCardPage />} />
          <Route path="/complaint" element={<ComplaintPage />} />
          <Route path="/account/profile" element={<AccountPage />} />
          <Route path="/account/training" element={<AccountTrainingPage />} />
          <Route path="/account/yellowcard" element={<AccountYellowCardPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="training" element={<TrainingsDashboard />} />
          <Route path="training/:idPelatihan" element={<TrainingsFormPage />} />
          <Route path="training/add" element={<TrainingsFormPage />} />
          {/* <Route path="training/add/:idPelatihan" element={<TrainingsFormPage />}/> */}
          <Route path="trainer" element={<TrainersDashboard />} />
          <Route path="trainer/:trainerId" element={<TrainerDashboard />} />
          <Route path="trainer/add" element={<TrainersFormPage />} />
          <Route path="trainer/add/:trainerId" element={<TrainersFormPage />} />
          <Route path="participant" element={<ParticipantsDashboard />} />
          <Route path="admin" element={<AdminsDashboard />} />
          <Route path="complaint" element={<ComplaintsDashboard />} />
          <Route path="yellowcard" element={<YellowCardsDashboard />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
