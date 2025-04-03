import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../../Button";
import { FaEnvelope } from "react-icons/fa";
import axios from "axios";

export default function MessageForm({ bookingId, onClose }) {
  const [messageForm, setMessageForm] = useState({
    subject: "",
    message: "",
  });

  const handleMessageSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/email",
        {
          bookingId,
          ...messageForm,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) throw new Error("Failed to send message");

      toast.success("Message sent successfully!");
      onClose();
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleMessageSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="subject"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Subject
          </label>
          <input
            type="text"
            id="subject"
            value={messageForm.subject}
            onChange={(e) =>
              setMessageForm((prev) => ({ ...prev, subject: e.target.value }))
            }
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Message
          </label>
          <textarea
            id="message"
            value={messageForm.message}
            onChange={(e) =>
              setMessageForm((prev) => ({ ...prev, message: e.target.value }))
            }
            className="w-full p-2 border border-gray-300 rounded-md h-32"
            required
          />
        </div>
        <div className="flex gap-3">
          <Button type="submit" variant="success" className="flex-1">
            Send Message
          </Button>
          <Button
            type="button"
            variant="white"
            className="flex-1"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
