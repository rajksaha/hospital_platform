package com.raydar.service;

import com.microsoft.azure.storage.CloudStorageAccount;
import com.microsoft.azure.storage.blob.CloudBlobClient;
import com.microsoft.azure.storage.blob.CloudBlobContainer;
import com.microsoft.azure.storage.blob.CloudBlockBlob;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

/**
 * Created by raj on 7/20/2016.
 */
@Service
public class FileUploadService {

    public String uploadFileToCloud(String storageConnectionString, String storage, String fileName, File file)throws IOException{

        try
        {


            // Retrieve storage account from connection-string.
            CloudStorageAccount storageAccount = CloudStorageAccount.parse(storageConnectionString);

            // Create the blob client.
            CloudBlobClient blobClient = storageAccount.createCloudBlobClient();

            // Retrieve reference to a previously created container.
            CloudBlobContainer container = blobClient.getContainerReference(storage);


            CloudBlockBlob blob = container.getBlockBlobReference(fileName);

            blob.upload(new FileInputStream(file), file.length());

        }
        catch (Exception e)
        {
            // Output the stack trace.
            e.printStackTrace();
        }

        return "https://senheng.blob.core.windows.net/" + storage + "/" + fileName;
    }

}
