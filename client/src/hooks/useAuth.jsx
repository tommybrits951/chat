import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthProvider'
import axios from '../api/axios'
export default function useAuth() {

    return useContext(AuthContext)
}
