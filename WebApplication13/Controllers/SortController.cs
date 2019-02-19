using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace WebApplication13.Controllers
{
    public class SortController : Controller
    {

        [Route("Sort/Bubblesort")]

        // Sorting function that returns current state of array through json object 
        public JsonResult Bubblesort(String input_string)
        {
            String[] arr_string = input_string.Split(',');

            int[] arr = new int[arr_string.Length];
            for (int i = 0; i < arr_string.Length; i++)
            {
                arr[i] = Int32.Parse(arr_string[i]);
            }
            int length = arr.Length;

            int[][] state = new int[arr.Length - 1][];

            for (int y = 0; y < arr.Length; y++)
            {
                for (int i = 0; i < arr.Length - 1; i++)
                {
                    if (arr[i] > arr[i + 1])
                    {
                        var tmp = arr[i + 1];
                        arr[i + 1] = arr[i];
                        arr[i] = tmp;
                        state[y] = (int[])arr.Clone();
                    }
                }
            }
            return Json(state);
        }



        [Route("Sort/Selectsort")]

        // Sorting function that returns current state of array through json object 
        public JsonResult Selectsort(String input_string)
        {
            String[] arr_string = input_string.Split(',');

            int[] arr = new int[arr_string.Length];
            for (int i = 0; i < arr_string.Length; i++)
            {
                arr[i] = Int32.Parse(arr_string[i]);
            }

            int length = arr.Length;

            int[][] state = new int[arr.Length - 1][];

            for (int i = 0; i < length - 1; i++)
            {
                int min = i;
                for (int j = i + 1; j < length; j++)
                {
                    if (arr[j] < arr[min])
                    {
                        min = j;
                    }
                }
                if (min != i)
                {
                    Swap(ref arr[i], ref arr[min]);
                    state[i] = (int[])arr.Clone();
                }
            }
            return Json(state);
        }

        private static void Swap(ref int a, ref int b)
        {
            int temp = a;
            a = b;
            b = temp;

        }

    }
}