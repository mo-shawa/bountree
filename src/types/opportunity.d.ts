import type { ObjectId, Document } from "mongodb"
import { Application } from "./application"

export type Opportunity = {
  _id: ObjectId | string
  id?: string
  title: string
  category: Category
  description: string
  idealCandidate: string
  requirements: string[]
  status: OpportunityStatus
  perks: {
    description?: string
    items: string[]
  }
  reward: {
    amount: number
    currency: string
  }
  salary: Salary
  location: string
  remote: boolean
  company: Company
  rejectionFeedback?: Feedback[]
  badge?: Badge
  createdAt: Date
  updatedAt: Date
}

export type OpportunityWithApplications = Opportunity & {
  applications: Application[]
}

type OpportunityStatus = "open" | "closed" | "paused"

type Category = "Engineering" | "Product" | "Marketing" | "Operations" | "Legal"

type Company = {
  name: string
  about: string
  url: string
  image: string
  founded: number
  industry?: string
  employees?: string
  stage:
    | "preseed"
    | "seed"
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "IPO"
    | "acquired"
    | "growth"
}

type Salary =
  | {
      type: "range"
      min: number
      max: number
      currency: string
    }
  | {
      type: "fixed"
      fixed: number
      currency: string
    }

type Badge = {
  type:
    | "red"
    | "orange"
    | "yellow"
    | "green"
    | "blue"
    | "indigo"
    | "purple"
    | "pink"
  text: string
}

type Feedback = {
  application: ObjectId | string
  date: Date
  content: string
}
